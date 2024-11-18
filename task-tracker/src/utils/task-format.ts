import { Task } from "../task.service";
export class TaskFormat {
  idCol;
  createdAtCol;
  updatedAtCol;
  taskCol;
  statusCol;
  constructor() {
    this.idCol = `ID${" ".repeat(5)}`;
    this.createdAtCol = `Created At${" ".repeat(20)}`;
    this.updatedAtCol = `Updated At${" ".repeat(20)}`;
    this.taskCol = `Task${" ".repeat(35)}`;
    this.statusCol = `Status${" ".repeat(10)}`;
  }

  /**
   * List all tasks with their details.
   * @param {Task[]} tasks - An array of task objects to be listed.
   */
  listTasks(tasks: Task[]) {
    this.displayHeader();
    this.displaySeparator();
    tasks.forEach((t) => {
      this.printSingleTask(t);
    });
  }
  displayHeader() {
    console.log(
      `\x1b[32m${this.idCol}| ${this.taskCol}| ${this.statusCol}| ${this.createdAtCol}| ${this.updatedAtCol}\x1b[32m`
    );
  }

  /**
   * Display the separator between the header and the values.
   */
  displaySeparator() {
    console.log(
      `${"-".repeat(this.idCol.length)}|${"-".repeat(
        this.taskCol.length + 1
      )}|${"-".repeat(this.statusCol.length + 1)}|${"-".repeat(
        this.createdAtCol.length + 1
      )}|${"-".repeat(this.updatedAtCol.length)}`
    );
  }

  /**
   * Display a single task.
   * @param {Task} task - The task object to be displayed.
   */
  printSingleTask(task: Task) {
    const id = this.formatEntry(task.id, this.idCol.length);
    const description = this.formatEntry(task.description, this.taskCol.length);
    const status = this.formatEntry(task.status, this.statusCol.length);
    const createdAt = this.formatEntry(
      new Date(task.createdAt).toLocaleString(),
      this.createdAtCol.length
    );
    const updatedAt = this.formatEntry(
      new Date(task.updatedAt).toLocaleString(),
      this.updatedAtCol.length
    );
    console.log(
      `\x1b[31m${id}\x1b[32m| ${description}| ${status}| \x1b[31m${createdAt}\x1b[32m| \x1b[31m${updatedAt}\x1b[37m`
    );
  }

  /**
   * Format a single entry, such as id, description, etc.
   * @param {string|number} rawEntry - The entry value, e.g., id, description, etc.
   * @param {number} max - The maximum length of the formatted entry.
   * @returns {string} - The formatted entry string.
   */
  private formatEntry(rawEntry: string | number, max: number) {
    const entry = rawEntry.toString();
    if (entry.length > max) {
      return `${this.truncate(entry, { size: max - 3, separator: "." })}`;
    }
    return `${this.truncate(entry, { size: max - 5, separator: "." })}${
      entry.length < max - 5
        ? " ".repeat(max - entry.length)
        : " ".repeat(max - entry.length)
    }`;
  }

  /**
   * Truncate a string to a specified length, adding a separator if necessary.
   * @param {string} t - The string to be truncated.
   * @param {Object} options - The options for truncating the string.
   * @param {string} options.separator - The separator to use when truncating.
   * @param {number} options.size - The maximum size of the truncated string.
   * @returns {string} - The truncated string.
   */
  private truncate(
    t: string,
    options: { separator: string; size: number }
  ): string {
    if (t) {
      let truncated = t.slice(0, options.size);
      truncated = truncated.trim();
      if (t.length > options.size) {
        truncated = `${truncated}${options.separator.repeat(3)}`;
      }
      return truncated;
    }
    return "";
  }
}
