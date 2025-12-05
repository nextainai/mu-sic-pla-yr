// SEARCH MUSIC
async function searchMusic(q) {
    const url = "https://musi-c.vercel.app/api/search?q=" + encodeURIComponent(q);
    const res = await fetch(url);
    const data = await res.json();
    return data.results || [];
}

function renderResults(list) {
    const container = document.getElementById("results");
    container.innerHTML = "";

    list.forEach(song => {
        const div = document.createElement("div");
        div.className = "song-card";

        div.innerHTML = `
            <img src="${song.thumbnail}" class="song-thumb">
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
        `;

        div.onclick = () => playSong(song.id);
        container.appendChild(div);
    });
}

async function playSong(id) {
    const url = "https://musi-c.vercel.app/api/song?id=" + id;
    const res = await fetch(url);
    const data = await res.json();

    document.getElementById("audioPlayer").src = data.audio;
}

document.getElementById("searchBtn").onclick = async () => {
    const query = document.getElementById("searchInput").value.trim();
    if (!query) return;

    const results = await searchMusic(query);
    renderResults(results);
};


// AI ADVISOR – FRONTEND ONLY (FOR GITHUB TESTING)
document.getElementById("askAI").onclick = async () => {
    const prompt = document.getElementById("aiInput").value.trim();
    if (!prompt) return;

    // Your key (testing only)
    const DEEPSEEK_KEY =
"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";

    const res = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${DEEPSEEK_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "deepseek-chat",
            messages: [{ role: "user", content: prompt }]
        })
    });

    const data = await res.json();

    document.getElementById("aiResponse").innerText =
        data.choices?.[0]?.message?.content || "No response";
};
