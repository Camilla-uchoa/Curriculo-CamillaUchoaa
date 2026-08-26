document.getElementById('btn-print').addEventListener("click", () => {window.print();})

const githubProjects = document.getElementById("github-projects");


async function carregarProjetos() {
    try {
        const resposta = await fetch("https://api.github.com/users/Camilla-uchoa/repos");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os projetos.");
        }

        const projetos = await resposta.json();

        githubProjects.innerHTML = "";

        projetos
            .filter(projeto => !projeto.fork)
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, 6)
            .forEach(projeto => {
                const card = document.createElement("article");

                card.classList.add("github-card");

                card.innerHTML = `
                    <h3>${projeto.name}</h3>
                    <p>${projeto.description || "Projeto sem descrição."}</p>
                    <p><strong>Linguagem:</strong> ${projeto.language || "Não informada"}</p>
                    <a href="${projeto.html_url}" target="_blank" rel="noopener noreferrer">
                        Ver projeto no GitHub
                    </a>
                `;

                githubProjects.appendChild(card);
            });

    } catch (erro) {
        githubProjects.innerHTML = `
            <p>Não foi possível carregar os projetos do GitHub no momento.</p>
        `;

        console.error(erro);
    }
}

carregarProjetos();