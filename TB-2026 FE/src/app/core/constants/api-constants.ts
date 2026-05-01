export abstract class ApiConstants {
    public static readonly API_POST = "POST";
    public static readonly API_GET = "GET";
    public static readonly API_PUT = "PUT";
    public static readonly API_DELETE = "DELETE";

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

        // Resume Template API
        'UpdateResumeTemplateStatus',
        'UploadResumeTemplate',
        'UpdateResumeTemplate',

        //super admin API
        "ResendInvitation",
        "CreateSuperAdminUser"
    ];
}
