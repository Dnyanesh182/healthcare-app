namespace HealthCareInnovation_Model.ViewModel
{
    public class AccountDetailViewModel
    {
        public int AccountId { get; set; }
        public string? AccountName { get; set; }
        public bool IsActive { get; set; }
        public string? Theme { get; set; }
        public string? AccountEmail { get; set; }
        public string? PrimaryColorCode { get; set; }
        public string? SecondaryColorCode { get; set; }
        public string? TertiaryColorCode { get; set; }
        public string? AccountLogoUrl { get; set; }
        public bool IsOigEnable { get; set; }
        public bool IsNursysEnable { get; set; }
        public bool IsSamEnable { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? ZipCode { get; set; }
        public bool IsSharePointConnected { get; set; }
        public string? SharePointConnectionError { get; set; }
        public string? Role { get; set; }
        public bool IsDownloadable { get; set; }
        public int TotalUsers { get; set; }
        public TimeZoneViewModel? TimeZoneInfo { get; set; }
        public SharepointConfigurations? SharepointConfigurations { get; set; }
    }

    public class TimeZoneViewModel
    {
        public int TimeZoneId { get; set; }
        public string? FullName { get; set; }
        public string? ShortName { get; set; }
        public string? Offset { get; set; }
        public bool IsActive { get; set; }
    }

    public class SharepointConfigurations
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public string? SiteUrl { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? AppId { get; set; }
        public string? ClientSecret { get; set; }
        public string? DefaultFolderPath { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }

    public class UserListViewModel
    {
        public string? Id { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public bool IsActive { get; set; }
        public string? Role { get; set; }
        public int? AccountId { get; set; }
    }

    public class UserDetailViewModel
    {
        public string? Id { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public bool IsActive { get; set; }
        public string? Role { get; set; }
        public int? AccountId { get; set; }
        public string? PhoneNumber { get; set; }
    }
}

namespace HealthCareInnovation_Model.Model
{
    using HealthCareInnovation_Model.ViewModel;

    public class ServiceResult<T>
    {
        public bool Success { get; set; }
        public T? Data { get; set; }
        public string? Message { get; set; }
        public List<string>? Errors { get; set; }
    }

    public class CreateUserRequest
    {
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }
        public int? AccountId { get; set; }
    }

    public class UserListRequestModel
    {
        public int? PageNumber { get; set; } = 1;
        public int? PageSize { get; set; } = 10;
        public string? SearchTerm { get; set; }
        public int? AccountId { get; set; }
        public bool? IsActive { get; set; }
    }

    public class UpdateAccountInfoRequest
    {
        public string? AccountName { get; set; }
        public string? AccountEmail { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? ZipCode { get; set; }
        public string? UserEmail { get; set; }
        public string? UserFirstName { get; set; }
        public string? UserLastName { get; set; }
        public string? ChecksId { get; set; }
    }

    public class CreateAccountRequest
    {
        public string? AccountName { get; set; }
        public string? AccountEmail { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? ZipCode { get; set; }
    }

    public class UpdateAccountStatusRequest
    {
        public int AccountId { get; set; }
        public string? ClientName { get; set; }
        public bool IsActive { get; set; }
    }

    public class UpdateSharepointConfigurationsRequest
    {
        public int AccountId { get; set; }
        public int? SharepointId { get; set; }
        public string? SiteUrl { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? AppId { get; set; }
        public string? ClientSecret { get; set; }
        public string? DefaultFolderPath { get; set; }
    }
}
