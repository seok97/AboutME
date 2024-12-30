function githubAPI() {

    const getAboutMe = async (
        GITHUB_API_URL
        , GITHUB_API_GET_REPO_ABOUTME_PATH
        , GITHUB_API_GET_REPO_ABOUTME_FILE_NAME
        , GITHUB_TOKEN
        , GITHUB_API_VERSION
        , GITHUB_API_HEADER_ACCEPT
    ) => {
        const pathEncoded = encodeURIComponent(GITHUB_API_GET_REPO_ABOUTME_PATH);
        const fileNameEncoded = encodeURIComponent(GITHUB_API_GET_REPO_ABOUTME_FILE_NAME);
        const url = GITHUB_API_URL + pathEncoded + '/' + fileNameEncoded + '.md';

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': GITHUB_API_HEADER_ACCEPT,
                'Authorization': 'Bearer ' + GITHUB_TOKEN,
                'X-GitHub-Api-Version': GITHUB_API_VERSION,
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
        .then(data => {
            // Base64 디코딩 및 UTF-8 변환
            const binaryString = atob(data.content);
            const binaryArray = Uint8Array.from(binaryString, char => char.charCodeAt(0));

            // UTF-8 디코더 생성
            const decoder = new TextDecoder('utf-8');
            return decoder.decode(binaryArray);
        })

        return response
    }

    return [
        getAboutMe
    ]
}

export default githubAPI;