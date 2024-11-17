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

  displaySeparator() {
    console.log(
      `${"-".repeat(this.idCol.length)}|${"-".repeat(
        this.taskCol.length+1
      )}|${"-".repeat(this.statusCol.length + 1)}|${"-".repeat(
        this.createdAtCol.length + 1
      )}|${"-".repeat(this.updatedAtCol.length)}`
    );
  }

  printSingleTask(task: Task) {
    const id = this.formatEntry(task.id, this.idCol.length, true);
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

  formatEntry(rawEntry: string | number, max: number, start: boolean = false) {
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

  truncate(t: string, options: { separator: string; size: number }) {
    if (t) {
      let truncated = t.slice(0, options.size);
      truncated = truncated.trim();
      if (t.length > options.size)
        truncated = `${truncated}${options.separator.repeat(3)}`;
      return truncated;
    }
  }
}
