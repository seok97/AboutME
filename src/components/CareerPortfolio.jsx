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
            techStack: []
        };

        let currentAchievement = null;
        let isAchievementSection = false;

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
                isAchievementSection = true;
            } else if (isAchievementSection && currentAchievement && (line.startsWith('  - ') || line.startsWith('\t- '))) {
                currentAchievement.details.push(trimmedLine.substring(1).trim());
            } else if (isAchievementSection && trimmedLine.startsWith('- ')) {
                const title = trimmedLine.substring(1).replace(/\*\*/g, '').trim();
                currentAchievement = {
                    title: title,
                    details: []
                };
                project.achievements.push(currentAchievement);
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
