<a name="readme-top"></a>

<div align="center">
  <h3><b>Task Tracker</b></h3>
</div>

# 📗 Table of Contents

- [📗 Table of Contents](#-table-of-contents)
- [📖 About ](#-about-)
- [🔗 Project Source ](#-project-source-)
  - [🛠 Built With ](#-built-with-)
    - [Tech Stack ](#tech-stack-)
    - [Key Features ](#key-features-)
  - [💻 Getting Started ](#-getting-started-)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Usage](#usage)
      - [Available commands](#available-commands)
  - [👥 Authors ](#-authors-)
  - [🔭 Future Features ](#-future-features-)
  - [🤝 Contributing ](#-contributing-)
  - [⭐️ Show your support ](#️-show-your-support-)
  - [🙏 Acknowledgments ](#-acknowledgments-)
  - [📝 License ](#-license-)

# 📖 About <a name="about-project"></a>

The **Task Tracker** Application is a command-line tool for managing tasks. Each task has an ID, timestamp, description, and status. The statuses are: `todo`, `in-progress`, and `done`. The CLI supports adding, updating, deleting, listing tasks, and changing their status.

# 🔗 Project Source <a name="source"></a>

This project is part of the Roadmap.sh initiative. Roadmap.sh is a platform that provides detailed, interactive roadmaps for developers to guide their learning and career progression. You can explore more projects and resources on their platform to help you on your development journey.

**Project link:** https://roadmap.sh/projects/task-tracker

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

- **Typescript**
- **Bash**

### Key Features <a name="key-features"></a>

- [ ] **Add, Update, and Delete tasks**
- [ ] **Mark a task as in progress or done**
- [ ] **List all tasks**
- [ ] **List all tasks that are done**
- [ ] **List all tasks that are not done**
- [ ] **List all tasks that are in progress**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 💻 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps.

### Prerequisites

In order to run this project you need:

- nodejs

### Setup

Clone this repository to your desired folder:

```sh
  git clone https://github.com/Mahamadou-Nouridine/roadmap.sh-backend-project.git <my-folder>
```

navigate in the folder:

```sh
  cd <my-folder>/task-tracker
```

Setup the application (with script, manually):

- **With script**: execute the following command
  > Run `chmod u+x setup.sh` if it is not executing

```sh
  ./setup.sh #Install the dependencies and build the application
```

- **Manually**: execute the following command
  > Run `chmod u+x setup.sh` if it is not executing

```sh
  npm install #install the dependencies
  npm run build #Build the application
```

### Usage

To run the project, execute the following command:

> Run `chmod u+x task-cli.sh` if it is not executing

```sh
  ./task-cli <command> [args]
```

#### Available commands

- [ ] `add <description>`

  - **Description**: Adding a new task
  - **arguments**:
    - `<description>`: The task description
  - **example**: `./task-cli.sh add "Buy groceries"`

- [ ] `update <id> <new_description>`

  - **Description**: Updating an existing task
  - **arguments**:
    - `<id>`: The ID of the task to update
    - `<new_description>`: The new description of the task
  - **example**: `./task-cli.sh update 1 "Buy groceries and cook dinner"`

- [ ] `delete <id>`

  - **Description**: Deleting a task
  - **arguments**:
    - `<id>`: The ID of the task to delete
  - **example**: `./task-cli.sh delete 1`

- [ ] `mark-in-progress <id>`

  - **Description**: Marking a task as in progress
  - **arguments**:
    - `<id>`: The ID of the task to mark as in progress
  - **example**: `./task-cli.sh mark-in-progress 1`

- [ ] `mark-done <id>`

  - **Description**: Marking a task as done
  - **arguments**:
    - `<id>`: The ID of the task to mark as done
  - **example**: `./task-cli.sh mark-done 1`

- [ ] `list`

  - **Description**: Listing all tasks
  - **arguments**: None
  - **example**: `./task-cli.sh list`

- [ ] `list <status>`

  - **Description**: Listing tasks by status
  - **arguments**:
    - `<status>`: The status of the tasks to list (e.g., `done`, `todo`, `in-progress`)
  - **example**: `./task-cli.sh list done`

- [ ] `--help [command]`
  - **Description**: Displaying help for a specific command
  - **Arguments**:
    - `[command]`: The command to get help for (optional)
  - **Example**: `./task-cli.sh --help add` or `./task-cli.sh --help`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 👥 Authors <a name="authors"></a>

👤 **Mahamadou Nouridine**

- GitHub: [mahamadou-nouridine](https://github.com/mahamadou-nouridine)
- Linkedin: [mahamadou-nouridine-mamoudou-souley-2b424a1a5](https://www.linkedin.com/in/mahamadou-nouridine)
- Twitter: [Nouridine_Dino](https://twitter.com/Nouridine_Dino)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔭 Future Features <a name="future-features"></a>

- [ ] **Use binary search algorithm to reduice the time complexity of look-up**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/Mahamadou-Nouridine/My-Portfolio/issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ⭐️ Show your support <a name="support"></a>

If you like this project give me a follow and/or a star

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🙏 Acknowledgments <a name="acknowledgements"></a>

I would like to extend my gratitude to:

- [kamranahmedse](https://github.com/kamranahmedse) for his vision in creating the [Roadmap.sh](https://roadmap.sh/) platform, which enables people to continually develop their skills.
- The entire [Roadmap.sh](https://roadmap.sh/) team for their dedicated efforts and hard work.
- All contributors and stargazers for their valuable support and contributions.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📝 License <a name="license"></a>

This project is [MIT](./LICENSE) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
