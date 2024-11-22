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
      case "MemberEvent":
        return this.formatMemberEvent(event);
      case "ReleaseEvent":
        return this.formatReleaseEvent(event);
      case "IssueCommentEvent":
        return this.formatIssueCommentEvent(event);
      case "CommitCommentEvent":
        return this.formatCommitCommentEvent(event);
      case "RepoEvent":
        return this.formatRepoEvent(event);
      case "StatusEvent":
        return this.formatStatusEvent(event);
      case "SponsorshipEvent":
        return this.formatSponsorshipEvent(event);
      case "PullRequestReviewThreadEvent":
        return this.formatPullRequestReviewThreadEvent(event);
      case "PullRequestReviewCommentEvent":
        return this.formatPullRequestReviewCommentEvent(event);
      case "PullRequestReviewEvent":
        return this.formatPullRequestReviewEvent(event);
      case "GollumEvent":
        return this.formatGollumEvent(event);
      default:
        return `Unknown event type`;
    }
  }

  private static formatPushEvent(event: PushEvent): string {
    return `- Pushed ${event.payload.size} commits to ${event.repo.name}`;
  }

  private static formatPublicEvent(event: PublicEvent): string {
    if (event.action === "publicized") {
      return `- Made the repository "${event.repo.name}" public.`;
    }
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

  private static formatMemberEvent(event: MemberEvent): string {
    return `- ${
      event.payload.action.charAt(0).toUpperCase() +
      event.payload.action.slice(1)
    } member ${event.payload.member.login} in ${event.repo.name}`;
  }

  private static formatReleaseEvent(event: ReleaseEvent): string {
    return `- ${
      event.payload.action.charAt(0).toUpperCase() +
      event.payload.action.slice(1)
    } release "${event.payload.release.name}" (tag: ${
      event.payload.release.tag_name
    }) in ${event.repo.name}`;
  }

  private static formatIssueCommentEvent(event: IssueCommentEvent): string {
    return `- ${
      event.payload.action.charAt(0).toUpperCase() +
      event.payload.action.slice(1)
    } comment on issue #${event.payload.issue.number} in ${event.repo.name}`;
  }

  private static formatCommitCommentEvent(event: CommitCommentEvent): string {
    return `- ${
      event.payload.action.charAt(0).toUpperCase() +
      event.payload.action.slice(1)
    } comment on commit ${event.payload.commit_id} in ${event.repo.name}`;
  }

  private static formatRepoEvent(event: RepoEvent): string {
    return `- ${
      event.payload.action.charAt(0).toUpperCase() +
      event.payload.action.slice(1)
    } repository ${event.payload.repository.name}`;
  }

  private static formatStatusEvent(event: StatusEvent): string {
    return `- Commit ${event.payload.commit.id} in ${event.repo.name} has status: ${event.payload.state} (context: ${event.payload.context})`;
  }

  private static formatSponsorshipEvent(event: SponsorshipEvent): string {
    return `- ${event.payload.action} sponsorship for tier "${event.payload.sponsorship.tier.description}" in ${event.repo.name}`;
  }

  private static formatPullRequestReviewThreadEvent(
    event: PullRequestReviewThreadEvent
  ): string {
    return `- ${
      event.payload.action.charAt(0).toUpperCase() +
      event.payload.action.slice(1)
    } a review thread in pull request #${event.payload.pull_request.id} in ${
      event.repo.name
    }`;
  }

  private static formatPullRequestReviewCommentEvent(
    event: PullRequestReviewCommentEvent
  ): string {
    return `- ${
      event.payload.action.charAt(0).toUpperCase() +
      event.payload.action.slice(1)
    } comment on pull request #${event.payload.pull_request.id} in ${
      event.repo.name
    }`;
  }

  private static formatPullRequestReviewEvent(
    event: PullRequestReviewEvent
  ): string {
    return `- ${
      event.payload.action.charAt(0).toUpperCase() +
      event.payload.action.slice(1)
    } review "${event.payload.review.body}" for pull request #${
      event.payload.pull_request.number
    } in ${event.repo.name}`;
  }

  private static formatGollumEvent(event: GollumEvent): string {
    const pageActions = event.payload.pages
      .map((page) => `- ${page.action} page "${page.title}"`)
      .join("\n");
    return `- ${pageActions} in repository ${event.repo.name}`;
  }
}
