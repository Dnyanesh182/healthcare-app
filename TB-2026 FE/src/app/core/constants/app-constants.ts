export abstract class AppConstants {
    public static readonly NOT_AVAILABLE = "not available";
    public static readonly NONE_SELECTED = "None Selected";
    public static readonly SOMETHING_WENT_WRONG = "Something went wrong. Please try again later.";

    public static readonly SPACE_WITH_CST = " CST";
    public static readonly DATE_FORMAT = 'MM/DD/YYYY';
    public static readonly DATE_TIME_FORMAT = 'MM/DD/YYYY HH:mm:ss';
    public static readonly DATE_TIME_FORMAT_WITHOUT_SECONDS = 'MM/DD/YYYY HH:mm';
    public static readonly DATE_TIME_FORMAT_WITHOUT_SECONDS_AND_MILLISECONDS = 'MM/DD/YYYY HH:mm:ss.SSS';
    public static readonly DATE_TIME_FORMAT_WITHOUT_SECONDS_AND_MILLISECONDS_WITHOUT_TIMEZONE = 'MM/DD/YYYY HH:mm:ss';
    
    public static readonly API_POST = "POST";
    public static readonly API_GET = "GET";
    public static readonly API_PUT = "PUT";
    public static readonly API_DELETE = "DELETE";


    //Date Formats
    public static readonly M_D_Y = "MM/DD/YYYY";
    public static readonly m_D_Y_HYPHEN = "M-DD-YYYY";
    public static readonly YYYY_MM_DD_HYPHEN = "YYYY-MM-DD";
    //Date Range
    public static readonly DATE_RANGE = [
        { value: 1, date_range: "Today" },
        { value: 2, date_range: "Yesterday" },
        { value: 3, date_range: "Last 7 Days" },
        { value: 4, date_range: "Last Month" },
        { value: 5, date_range: "Custom Range" }
    ]

    public static readonly PAGE_SIZE_OPTIONS = [10, 25, 50]; // Options for page size in pagination
    public static readonly DEFAULT_PAGE_SIZE = 25; // Default page size for pagination
    public static readonly DEFAULT_PAGE_INDEX = 0; // Default page index for pagination
    public static readonly DEFAULT_PAGE_NUMBER = 1; // Default page number for pagination

    public static readonly DEFAULT_IMAGE_PROFILE_IMG = "assets/userProfile.png"; // Default profile image path

    public static readonly API_TO_SHOW_SUCCESS_TOASTR = [
        // common api 
        'RemovePhoto',
        'UploadPhotoToBlob',

        // Auth API
        'UpdateAccountStatus',
        'ForgotPassword',
        'ResetPassword',
        'ValidateResetToken',
        'ChangePassword',

        // Auto Creds API
        'CreateSAMApiKey',
        'UpdateSAMApiKey',
        'ModifyNursysUserCredentials',

        // team API
        'CreateTeam',
        'AddTeamMember',
        'UpdateTeamDetails',
        'RemoveTeamMember',
        'ChangeTeamStatus',

        // Account API
        'UpdateAccountChecks',
        'UpdateAccountInfo',
        'CreateAccount',

        // User API
        'AddUpdateUserTeamAndAccount',
        'UpdateUserInfo',
        'RemovePhoto',
        'UploadPhotoToBlob',
        'CreateUser',
        'ResendInvitation',
        'UpdateUserStatus',
        'AddUpdateUserActions',
        'UpdateUserInfo',
    ];
}
