export interface ClientConfig {
  accountId: string;
  id: string;
  accountName: string;
  accountEmail: string;
  theme: 'Universal themes'; // hardcoded value
  primaryColorCode: '#FF0000'; // hardcoded value
  secondaryColorCode: '#FFFF00'; // hardcoded value (note: removed leading space)
  tertiaryColorCode: '#0000FF'; // hardcoded value
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  isOigEnable: boolean;
  isNursysEnable: boolean;
  isSamEnable: boolean;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  UserRole: 'Admin'; // if this is always "Admin", you can hardcode it like this
}

export interface Account {
  theme: string;
  accountEmail: string;
  primaryColorCode: string;
  secondaryColorCode: string;
  tertiaryColorCode: string;
  accountLogoUrl: string | null;
  isOigEnable: boolean;
  isNursysEnable: boolean;
  isSamEnable: boolean;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string | null;
  isSharePointConnected: boolean;
  sharePointConnectionError: string | null;
  sharepointConfigurations: any; // Replace 'any' with the actual type if known
  accountChecks: Array < {
    id: number;
    type: string;
    key: string;
    value: string;
    displayName: string;
    description: string;
    sortOrder: number;
    url: string;
    isDeleted: boolean;
    createdOn: string; // Consider using Date if applicable
    createdBy: string | null;
    updatedOn: string | null; // Consider using Date if applicable
    updatedBy: string | null;
  } > ;
  role: string;
  accountTeams: Array < {
    teamId: number;
    teamName: string;
    accountId: number;
    accountName: string | null;
    checks: Array < {
      id: number;
      type: string;
      key: string;
      value: string;
      displayName: string;
      description: string;
      sortOrder: number;
      url: string;
    } > ;
  }>;
  isDownloadable: boolean | null;
  timeZoneInfo: {
    timeZoneId: number;
    fullName: string;

    shortName: string;
    offset: string;
    isActive: boolean;
    createdOn: string; // Consider using Date if applicable
  };
  accessoryTools: any; // Replace 'any' with the actual type if known
  accountId: number;
  accountName: string;
  isActive: boolean;
}
