interface BaseEvent {
  id: string;
  type: string;
  actor: {
    id: number;
    login: string;
    display_login: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  created_at: string;
  public: boolean;
}

// Specific event interfaces
interface PushEvent extends BaseEvent {
  type: "PushEvent";
  payload: {
    push_id: number;
    size: number;
    distinct_size: number;
    ref: string;
    head: string;
    before: string;
    commits: Array<{
      sha: string;
      author: { email: string; name: string };
      message: string;
      distinct: boolean;
      url: string;
    }>;
  };
}

interface CreateEvent extends BaseEvent {
  type: "CreateEvent";
  payload: {
    ref: string;
    ref_type: string;
    master_branch: string;
    description: string;
    pusher_type: string;
  };
}

interface DeleteEvent extends BaseEvent {
  type: "DeleteEvent";
  payload: {
    ref: string;
    ref_type: string;
    pusher_type: string;
  };
}

interface ForkEvent extends BaseEvent {
  type: "ForkEvent";
  payload: {
    forkee: {
      id: number;
      name: string;
      full_name: string;
      owner: {
        login: string;
        id: number;
        avatar_url: string;
        url: string;
      };
      private: boolean;
      html_url: string;
      description: string;
      fork: boolean;
      url: string;
      created_at: string;
      updated_at: string;
      pushed_at: string;
      git_url: string;
      ssh_url: string;
      clone_url: string;
      svn_url: string;
      homepage: string;
      size: number;
      stargazers_count: number;
      watchers_count: number;
      language: string;
      has_issues: boolean;
      has_projects: boolean;
      has_downloads: boolean;
      has_wiki: boolean;
      has_pages: boolean;
      forks_count: number;
      mirror_url: string | null;
      archived: boolean;
      disabled: boolean;
      open_issues_count: number;
      license: {
        key: string;
        name: string;
        spdx_id: string;
        url: string;
        node_id: string;
      };
      allow_forking: boolean;
      is_template: boolean;
      topics: string[];
      visibility: string;
      forks: number;
      open_issues: number;
      watchers: number;
      default_branch: string;
    };
  };
}

interface WatchEvent extends BaseEvent {
  type: "WatchEvent";
  payload: {
    action: string;
  };
}

interface IssuesEvent extends BaseEvent {
  type: "IssuesEvent";
  payload: {
    action: string;
    issue: {
      id: number;
      number: number;
      title: string;
      user: { login: string; id: number; avatar_url: string; url: string };
      labels: Array<{ id: number; name: string; color: string }>;
      state: string;
      locked: boolean;
      assignee: null | {
        login: string;
        id: number;
        avatar_url: string;
        url: string;
      };
      assignees: Array<{
        login: string;
        id: number;
        avatar_url: string;
        url: string;
      }>;
      milestone: null | {
        id: number;
        number: number;
        title: string;
        description: string;
        state: string;
        created_at: string;
        updated_at: string;
        due_on: string;
        closed_at: string;
      };
      comments: number;
      created_at: string;
      updated_at: string;
      closed_at: null | string;
      author_association: string;
      body: string;
    };
  };
}

interface PullRequestEvent extends BaseEvent {
  type: "PullRequestEvent";
  payload: {
    action: string;
    number: number;
    pull_request: {
      id: number;
      number: number;
      state: string;
      locked: boolean;
      title: string;
      user: { login: string; id: number; avatar_url: string; url: string };
      body: string;
      created_at: string;
      updated_at: string;
      closed_at: string | null;
      merged_at: string | null;
      merge_commit_sha: string | null;
      assignee: null | {
        login: string;
        id: number;
        avatar_url: string;
        url: string;
      };
      assignees: Array<{
        login: string;
        id: number;
        avatar_url: string;
        url: string;
      }>;
      requested_reviewers: Array<{
        login: string;
        id: number;
        avatar_url: string;
        url: string;
      }>;
      requested_teams: Array<{ id: number; name: string }>;
      labels: Array<{ id: number; name: string; color: string }>;
      milestone: null | {
        id: number;
        number: number;
        title: string;
        description: string;
        state: string;
        created_at: string;
        updated_at: string;
        due_on: string;
        closed_at: string;
      };
      draft: boolean;
      commits_url: string;
      review_comments_url: string;
      review_comment_url: string;
      comments_url: string;
      statuses_url: string;
    };
  };
}

// Define the structure for a PublicEvent (Visibility Change Event)
interface PublicEvent extends BaseEvent {
  type: "PublicEvent";
  action: "publicized" | "privatized";
}

interface MemberEvent extends BaseEvent {
  type: "MemberEvent";
  payload: {
    action: "added" | "removed"; // Indicates whether a member was added or removed
    member: {
      login: string;
      id: number;
      avatar_url: string;
      url: string;
    };
  };
}

interface ReleaseEvent extends BaseEvent {
  type: "ReleaseEvent";
  payload: {
    action: "created" | "edited" | "deleted"; // Possible actions regarding the release
    release: {
      id: number;
      tag_name: string;
      name: string;
      body: string;
      created_at: string;
      published_at: string | null;
      url: string;
      author: {
        login: string;
        id: number;
        avatar_url: string;
        url: string;
      };
    };
  };
}

interface IssueCommentEvent extends BaseEvent {
  type: "IssueCommentEvent";
  payload: {
    action: "created" | "edited" | "deleted"; // Actions that can be performed on a comment
    comment: {
      id: number;
      body: string;
      user: {
        login: string;
        id: number;
        avatar_url: string;
        url: string;
      };
      created_at: string;
      updated_at: string;
    };
    issue: {
      id: number;
      number: number;
      title: string;
      user: {
        login: string;
        id: number;
        avatar_url: string;
        url: string;
      };
      body: string;
    };
  };
}

interface CommitCommentEvent extends BaseEvent {
  type: "CommitCommentEvent";
  payload: {
    action: "created" | "edited" | "deleted"; // Actions regarding the commit comment
    comment: {
      id: number;
      body: string;
      user: {
        login: string;
        id: number;
        avatar_url: string;
        url: string;
      };
      created_at: string;
      updated_at: string;
    };
    commit_id: string;
  };
}

interface RepoEvent extends BaseEvent {
  type: "RepoEvent";
  payload: {
    action: "created" | "deleted"; // Action indicating repo creation or deletion
    repository: {
      id: number;
      name: string;
      url: string;
      owner: {
        login: string;
        id: number;
      };
    };
  };
}

interface StatusEvent extends BaseEvent {
  type: "StatusEvent";
  payload: {
    state: "pending" | "success" | "error" | "failure"; // Status of the commit
    context: string; // Context of the status (like CI checks)
    target_url: string | null; // The URL associated with the status
    description: string | null; // Description of the status
    commit: {
      id: string;
      url: string;
    };
  };
}

interface SponsorshipEvent {
  id: string;
  type: "SponsorshipEvent";
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    action: string;
    sponsorship: {
      id: number;
      tier: {
        id: number;
        description: string;
        monthly_price_in_cents: number;
      };
    };
  };
  created_at: string;
}

interface PullRequestReviewThreadEvent {
  id: string;
  type: "PullRequestReviewThreadEvent";
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    action: string;
    pull_request: {
      url: string;
      id: number;
    };
  };
  created_at: string;
}

interface PullRequestReviewCommentEvent {
  id: string;
  type: "PullRequestReviewCommentEvent";
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    action: string;
    comment: {
      id: number;
      body: string;
      created_at: string;
    };
    pull_request: {
      url: string;
      id: number;
    };
  };
  created_at: string;
}

interface PullRequestReviewEvent {
  id: string;
  type: "PullRequestReviewEvent";
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    action: string;
    review: {
      id: number;
      body: string;
      state: string;
    };
    pull_request: {
      url: string;
      id: number;
      number: number;
      title: string;
    };
  };
  created_at: string;
}

interface GollumEvent {
  id: string;
  type: "GollumEvent";
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    pages: {
      action: string;
      page_name: string;
      title: string;
      html_url: string;
      sha: string;
    }[];
  };
  created_at: string;
}

// Add other event types as needed following the same pattern

type GitHubEvent =
  | PushEvent
  | CreateEvent
  | DeleteEvent
  | ForkEvent
  | WatchEvent
  | IssuesEvent
  | PullRequestEvent
  | PublicEvent
  | MemberEvent
  | ReleaseEvent
  | IssueCommentEvent
  | CommitCommentEvent
  | RepoEvent
  | StatusEvent
  | SponsorshipEvent
  | PullRequestReviewThreadEvent
  | PullRequestReviewCommentEvent
  | PullRequestReviewEvent
  | GollumEvent;
type eventFormater = (event: GitHubEvent) => string;
