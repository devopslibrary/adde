export interface InstallationToken {
  expires_at: string;
  permissions: Permissions;
  repository_selection: string;
  token: string;
}
export interface Permissions {
  actions: string;
  administration: string;
  checks: string;
  contents: string;
  issues: string;
  metadata: string;
  pull_requests: string;
  repository_hooks: string;
  statuses: string;
}
