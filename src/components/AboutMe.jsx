import githubAPI from "../hooks/api/githubAPIs.js";
import MDEditor from '@uiw/react-md-editor';
import {useEffect, useState} from "react";

function AboutMe() {
    const [getAboutMe] = githubAPI();
    const [aboutMe, setAboutMe] = useState(null); // 상태로 데이터를 관리
    const [loading, setLoading] = useState(true); // 로딩 상태

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getAboutMe(
                    import.meta.env.VITE_GITHUB_API_URL,
                    import.meta.env.VITE_GITHUB_API_GET_REPO_ABOUTME_PATH,
                    import.meta.env.VITE_GITHUB_API_GET_REPO_ABOUTME_FILE_NAME,
                    import.meta.env.VITE_GITHUB_TOKEN,
                    import.meta.env.VITE_GITHUB_API_VERSION,
                    import.meta.env.VITE_GITHUB_API_HEADER_ACCEPT
                );
                setAboutMe(data); // 데이터를 상태에 저장
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // 로딩 상태 변경
            }
        }

        fetchData();
    }, [getAboutMe]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!aboutMe) {
        return <div>Error loading data.</div>;
    }

    return <div className="markdownDiv" data-color-mode="dark">
        <MDEditor.Markdown source={aboutMe} />
    </div>
}


export default AboutMe;