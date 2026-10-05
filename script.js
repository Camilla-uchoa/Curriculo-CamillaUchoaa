document.getElementById("btn-print").addEventListener("click", () => {
    window.print();
});

const githubProjects = document.getElementById("github-projects");

async function carregarProjetos() {
    try {
        const resposta = await fetch(
            "https://api.github.com/users/Camilla-uchoa/repos"
        );

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os projetos.");
        }

        const projetos = await resposta.json();

        githubProjects.innerHTML = "";

        projetos
            .filter(projeto => !projeto.fork)
            .sort(
                (a, b) =>
                    new Date(b.updated_at) - new Date(a.updated_at)
            )
            .slice(0, 6)
            .forEach(projeto => {
                const card = document.createElement("article");

                card.classList.add("github-card");

                card.innerHTML = `
                    <h3>${projeto.name}</h3>

                    <p>
                        ${projeto.description || "Projeto sem descrição."}
                    </p>

                    <p>
                        <strong>Linguagem:</strong>
                        ${projeto.language || "Não informada"}
                    </p>

                    <a
                        href="${projeto.html_url}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ver projeto no GitHub
                    </a>
                `;

                githubProjects.appendChild(card);
            });

    } catch (erro) {
        githubProjects.innerHTML = `
            <p>
                Não foi possível carregar os projetos do GitHub no momento.
            </p>
        `;

        console.error(erro);
    }
}

carregarProjetos();


// ==============================
// COMPARTILHAMENTO DO CURRÍCULO
// ==============================

const btnShare = document.getElementById("btn-share");
const shareResult = document.getElementById("share-result");

btnShare.addEventListener("click", async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: "Currículo - Camilla Uchôa",
                text: "Confira meu currículo e portfólio profissional:",
                url: window.location.href
            });

            shareResult.textContent =
                "Currículo compartilhado com sucesso!";

        } catch (erro) {
            if (erro.name !== "AbortError") {
                shareResult.textContent =
                    "Não foi possível compartilhar o currículo.";
            }
        }

    } else {
        shareResult.textContent =
            "O compartilhamento não é compatível com este navegador.";
    }
});


// ==============================
// SERVICE WORKER - PWA
// ==============================

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./service-worker.js")

            .then(() => {
                console.log(
                    "Service Worker registrado com sucesso."
                );
            })

            .catch((erro) => {
                console.error(
                    "Erro ao registrar o Service Worker:",
                    erro
                );
            });
    });
}