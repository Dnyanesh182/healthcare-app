export interface User
{
  accountId: any;
	totalUsers    ?: any;
	zip           ?: any;
	timeZoneInfo  ?: {
		timeZoneId: number;
		fullName: string;
		shortName: string;
		offset: string;
		isActive: boolean;
		createdOn: string;
	  };
	city		  ?: any;
	state         ?: any;
	email         ?: string;
	firstName     ?: string;
	middleName    ?: string;
	lastName      ?: string;
	userName      ?: string;
	phoneNumber   ?: string;
	id            ?: string;
	isActive      ?: boolean;
    dob           ?: string;
    hireDate      ?: string;
    addedOn       ?: string;
	name          ?: string;
	clientId      ?: any;
	accountLogoUrl?: any;
}

