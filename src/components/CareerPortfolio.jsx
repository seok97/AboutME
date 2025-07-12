import React, { useState, useEffect } from 'react';
import './CareerPortfolio.css';

// Markdown 텍스트를 파싱하여 프로젝트 객체 배열로 변환하는 함수
const parseMarkdownToProjects = (markdown) => {
    const projects = [];
    const projectBlocks = markdown.split('---').filter(block => block.trim() !== '');

    projectBlocks.forEach((block, index) => {
        const lines = block.trim().split('\n');
        const project = {
            id: `project-${Date.now()}-${index}`,
            name: '',
            period: '',
            client: '',
            role: '',
            achievements: [],
            techStack: [],
            reflection: []
        };

        let currentAchievement = null;
        let isAchievementSection = false;
        let isReflectionSection = false;
        let currentDetailStack = [];

        const processIndentedContent = (line, content) => {
            const indentLevel = line.match(/^(\s*)/)[1].length;
            const depth = Math.floor(indentLevel / 2); // 2칸마다 depth 1 증가
            
            // depth에 따라 적절한 위치에 내용 추가
            if (depth === 1) {
                currentAchievement.details.push(content);
            } else if (depth > 1) {
                // 더 깊은 들여쓰기의 경우 구조적으로 표현
                const prefix = '  '.repeat(depth - 1);
                currentAchievement.details.push(prefix + content);
            }
        };

        lines.forEach(line => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('## ')) {
                project.name = trimmedLine.substring(3).trim();
            } else if (trimmedLine.startsWith('> ')) {
                const metaLine = trimmedLine.substring(2).trim();
                const [key, ...valueParts] = metaLine.split(':');
                const value = valueParts.join(':').trim();
                if (key.includes('진행 기간')) project.period = value;
                else if (key.includes('발주 기관')) project.client = value;
                else if (key.includes('주요 역할')) project.role = value;
                else if (key.includes('기술 스택')) {
                    project.techStack = value.split(',').map(tech => tech.trim());
                }
            } else if (trimmedLine.startsWith('### ')) {
                const sectionTitle = trimmedLine.substring(3).trim();
                if (sectionTitle.includes('업무 성과')) {
                    isAchievementSection = true;
                    isReflectionSection = false;
                } else if (sectionTitle.includes('회고')) {
                    isAchievementSection = false;
                    isReflectionSection = true;
                } else {
                    isAchievementSection = false;
                    isReflectionSection = false;
                }
            } else if (isAchievementSection && line.match(/^\s*-\s/)) {
                const indentLevel = line.match(/^(\s*)/)[1].length;
                const content = trimmedLine.substring(1).trim();
                
                if (indentLevel === 0) {
                    // 최상위 레벨 - 새로운 achievement
                    const title = content.replace(/\*\*/g, '').trim();
                    currentAchievement = {
                        title: title,
                        details: []
                    };
                    project.achievements.push(currentAchievement);
                } else if (currentAchievement) {
                    // 하위 레벨 - 기존 achievement의 세부사항
                    processIndentedContent(line, content);
                }
            } else if (isReflectionSection && trimmedLine.startsWith('- ')) {
                project.reflection.push(trimmedLine.substring(1).trim());
            }
        });

        if (project.period.includes('~ 진행중')) {
            project.isCurrent = true;
        }

        projects.push(project);
    });
    return projects;
};


const CareerPortfolio = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('./career.md')
            .then(response => {
                if (!response.ok) {
                    throw new Error('경력 데이터 파일을 불러오는 데 실패했습니다.');
                }
                return response.text();
            })
            .then(text => {
                const parsedProjects = parseMarkdownToProjects(text);
                setProjects(parsedProjects);
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="status-message">경력 정보를 불러오는 중입니다...</div>;
    }

    if (error) {
        return <div className="status-message error-message">{error}</div>;
    }

    const ProjectCard = ({ project }) => (
        <div className={`project ${project.isCurrent ? 'current-project' : ''}`}>
            <div className="project-header">
                <div className="project-name">
                    {project.name}
                </div>
                <div className="project-period">{project.period}</div>
            </div>

            <div className="project-body">
                <div className="project-info">
                    <div className="info-item">
                        <span className="info-label">Client</span>
                        <span className="info-value">{project.client || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Role</span>
                        <span className="info-value">{project.role}</span>
                    </div>
                </div>

                <div className="achievements">
                    <h4>주요 성과</h4>
                    {project.achievements.map((achievement, index) => (
                        <div key={index} className="achievement-group">
                            <div className="achievement-title">{achievement.title}</div>
                            {achievement.details.length > 0 && (
                                <ul className="achievement-list">
                                    {achievement.details.map((detail, detailIndex) => (
                                        <li key={detailIndex}>{detail}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                {project.reflection && project.reflection.length > 0 && (
                    <div className="reflection">
                        <h4>회고</h4>
                        <div className="reflection-content">
                            {project.reflection.map((reflection, index) => (
                                <p key={index} className="reflection-item">{reflection}</p>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="project-footer">
                <div className="tech-stack">
                    {project.techStack.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="container">
            <div className="header">
                {/* 이름 추가 */}
                <h1 className="my-name">석우현</h1>
                <div className="subtitle">Web Developer Portfolio</div>

                {/* 자기소개 요약 박스 */}
                <div className="summary-box">
                    <p className="summary">
                        맡은 바 임무는 책임을 다해 처리하려고 노력하며 이를 바탕으로 주로 백엔드, 서브로 프론트엔드 개발을 하고 있으며 <br/>
                        늘 새로운 기술 학습을 통해 끊임없이 성장하는 풀 스택 지향 개발자입니다.
                    </p>
                </div>

                {/* 주요 기술 스택 추가 */}
                <div className="main-skills">
                    <span className="skill-item">Java</span>
                    <span className="skill-item">Javascript</span>
                    <span className="skill-item">Python</span>
                    <span className="skill-item">Spring Boot</span>
                    <span className="skill-item">React</span>
                    <span className="skill-item">Vue.js</span>
                    <span className="skill-item">Airflow</span>
                    <span className="skill-item">Google Cloud</span>
                    <span className="skill-item">BigQuery</span>
                </div>
            </div>

            <div className="content">
            <div className="section">
                    <h2 className="section-title">Projects</h2>
                    {projects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CareerPortfolio;
