export class GitHubEventFormatters {
  static format(event: GitHubEvent): string {
    switch (event.type) {
      case "PushEvent":
        return this.formatPushEvent(event);
      case "CreateEvent":
        return this.formatCreateEvent(event);
      case "DeleteEvent":
        return this.formatDeleteEvent(event);
      case "ForkEvent":
        return this.formatForkEvent(event);
      case "WatchEvent":
        return this.formatWatchEvent(event);
      case "IssuesEvent":
        return this.formatIssuesEvent(event);
      case "PullRequestEvent":
        return this.formatPullRequestEvent(event);
      case "PublicEvent":
        return this.formatPublicEvent(event);
      default:
        return `Unknown event type`;
    }
  }

  private static formatPushEvent(event: PushEvent): string {
    return `- Pushed ${event.payload.size} commits to ${event.repo.name}`;
  }

  private static formatPublicEvent(event: PublicEvent) {
    if (event.action === "publicized")
      return `- Made the repository "${event.repo.name}" public.`;
    return `- Made the repository "${event.repo.name}" private.`;
  }

  private static formatCreateEvent(event: CreateEvent): string {
    return `- Created ${event.payload.ref_type} ${event.payload.ref} in ${event.repo.name}`;
  }

  private static formatDeleteEvent(event: DeleteEvent): string {
    return `- Deleted ${event.payload.ref_type} ${event.payload.ref} in ${event.repo.name}`;
  }

  private static formatForkEvent(event: ForkEvent): string {
    return `- Forked ${event.repo.name} to ${event.payload.forkee.full_name}`;
  }

  private static formatWatchEvent(event: WatchEvent): string {
    return `- Started watching ${event.repo.name}`;
  }

  private static formatIssuesEvent(event: IssuesEvent): string {
    return `- ${
      event.payload.action.charAt(0).toUpperCase() +
      event.payload.action.slice(1)
    } issue #${event.payload.issue.number} in ${event.repo.name}`;
  }

  private static formatPullRequestEvent(event: PullRequestEvent): string {
    return `- ${
      event.payload.action.charAt(0).toUpperCase() +
      event.payload.action.slice(1)
    } pull request #${event.payload.pull_request.number} in ${
      event.repo.name
    }: "${event.payload.pull_request.title}"`;
  }
}
