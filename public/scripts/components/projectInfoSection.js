class ProjectInfoSection extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.template = document.createElement('template');
    }

    connectedCallback() {
        this.render();
    }

    render() {

        this.template.innerHTML = /*html*/
        `
        <link href = "/public/stylesheets/style.css" type = "text/css" rel = "stylesheet">
        <div class = "project-info-wrapper">
            <div class = "project-info-buttons-wrapper">
                <button id = "project-info-members-button">Members</button>
                <button id = "project-info-stats-button">Statistics</button>
            </div>
        </div>
        `;

        this.shadow.appendChild(this.template.content.cloneNode(true));
    }

}

customElements.define("project-info", ProjectInfoSection);