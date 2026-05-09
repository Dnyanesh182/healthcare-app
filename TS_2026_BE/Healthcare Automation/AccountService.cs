using HealthCareInnovation_Model.ViewModel;
using HealthCareInnovation_Model.Model;
using Microsoft.Extensions.Configuration;
using System.Linq;

namespace HealthCareInnovation_Services.Healthcare_Automation
{
    public class AccountService : IAccountService
    {
        private readonly IConfiguration _configuration;

        private static List<AccountDetailViewModel> _accounts = new List<AccountDetailViewModel>
        {
            new AccountDetailViewModel
            {
                AccountId = 1,
                AccountName = "TechCorp 1",
                IsActive = true,
                Theme = "default",
                AccountEmail = "contact1@techcorp.com",
                PrimaryColorCode = "#FF5733",
                SecondaryColorCode = "#33FF57",
                TertiaryColorCode = "#3357FF",
                AccountLogoUrl = "https://example.com/logos/account1.png",
                IsOigEnable = true,
                IsNursysEnable = true,
                IsSamEnable = true,
                Address1 = "100 Main Street",
                Address2 = "Suite 10",
                City = "New York",
                State = "NY",
                ZipCode = "10001",
                IsSharePointConnected = true,
                SharePointConnectionError = null,
                Role = "Admin",
                IsDownloadable = true,
                TotalUsers = 5,
                SharepointConfigurations = new SharepointConfigurations
                {
                    Id = 1,
                    AccountId = 1,
                    SiteUrl = "https://techcorp.sharepoint.com/sites/main",
                    UserName = "admin@techcorp.com",
                    Password = "TechP@ss123",
                    AppId = "4d144dc8-8a4c-4265-9f87-aac0d8745b34",
                    ClientSecret = "wX3t9sKL8qeAvalidlongvalue123456",
                    DefaultFolderPath = "Shared Documents/HR",
                    IsActive = true,
                    CreatedDate = new DateTime(2024, 1, 15)
                },
                TimeZoneInfo = new TimeZoneViewModel
                {
                    TimeZoneId = 1,
                    FullName = "Eastern Standard Time",
                    ShortName = "EST",
                    Offset = "-05:00",
                    IsActive = true
                }
            },
            new AccountDetailViewModel
            {
                AccountId = 2,
                AccountName = "HealthPlus 2",
                IsActive = false,
                Theme = "dark",
                AccountEmail = "contact2@healthplus.com",
                PrimaryColorCode = "#C70039",
                SecondaryColorCode = "#FFC300",
                TertiaryColorCode = "#DAF7A6",
                AccountLogoUrl = "https://example.com/logos/account2.png",
                IsOigEnable = false,
                IsNursysEnable = true,
                IsSamEnable = false,
                Address1 = "200 Elm Street",
                Address2 = null,
                City = "Los Angeles",
                State = "CA",
                ZipCode = "90210",
                IsSharePointConnected = false,
                SharePointConnectionError = "Connection failed",
                Role = "Manager",
                IsDownloadable = false,
                TotalUsers = 3,
                TimeZoneInfo = new TimeZoneViewModel
                {
                    TimeZoneId = 2,
                    FullName = "Pacific Standard Time",
                    ShortName = "PST",
                    Offset = "-08:00",
                    IsActive = true
                }
            },
            new AccountDetailViewModel
            {
                AccountId = 3,
                AccountName = "MediCare Solutions 3",
                IsActive = true,
                Theme = "light",
                AccountEmail = "contact3@medicaresolutions.com",
                PrimaryColorCode = "#900C3F",
                SecondaryColorCode = "#581845",
                TertiaryColorCode = "#FFC0CB",
                AccountLogoUrl = "https://example.com/logos/account3.png",
                IsOigEnable = true,
                IsNursysEnable = false,
                IsSamEnable = true,
                Address1 = "300 Oak Avenue",
                Address2 = "Floor 5",
                City = "Chicago",
                State = "IL",
                ZipCode = "60601",
                IsSharePointConnected = true,
                SharePointConnectionError = null,
                Role = "User",
                IsDownloadable = true,
                TotalUsers = 7,
                TimeZoneInfo = new TimeZoneViewModel
                {
                    TimeZoneId = 3,
                    FullName = "Central Standard Time",
                    ShortName = "CST",
                    Offset = "-06:00",
                    IsActive = true
                }
            },
            new AccountDetailViewModel
            {
                AccountId = 4,
                AccountName = "BioTech Labs 4",
                IsActive = true,
                Theme = "blue",
                AccountEmail = "contact4@biotechlabs.com",
                PrimaryColorCode = "#1F77B4",
                SecondaryColorCode = "#FF7F0E",
                TertiaryColorCode = "#2CA02C",
                AccountLogoUrl = "https://example.com/logos/account4.png",
                IsOigEnable = false,
                IsNursysEnable = true,
                IsSamEnable = false,
                Address1 = "400 Pine Road",
                Address2 = null,
                City = "Houston",
                State = "TX",
                ZipCode = "77001",
                IsSharePointConnected = true,
                SharePointConnectionError = null,
                Role = "SuperAdmin",
                IsDownloadable = false,
                TotalUsers = 4,
                TimeZoneInfo = new TimeZoneViewModel
                {
                    TimeZoneId = 4,
                    FullName = "Central Standard Time",
                    ShortName = "CST",
                    Offset = "-06:00",
                    IsActive = true
                }
            },
            new AccountDetailViewModel
            {
                AccountId = 5,
                AccountName = "PharmaGroup 5",
                IsActive = false,
                Theme = "green",
                AccountEmail = "contact5@pharmagroup.com",
                PrimaryColorCode = "#17BECF",
                SecondaryColorCode = "#BCBD22",
                TertiaryColorCode = "#7F7F7F",
                AccountLogoUrl = "https://example.com/logos/account5.png",
                IsOigEnable = true,
                IsNursysEnable = true,
                IsSamEnable = true,
                Address1 = "500 Maple Lane",
                Address2 = "Apt 20",
                City = "Phoenix",
                State = "AZ",
                ZipCode = "85001",
                IsSharePointConnected = false,
                SharePointConnectionError = "Connection failed",
                Role = "Viewer",
                IsDownloadable = true,
                TotalUsers = 2,
                TimeZoneInfo = new TimeZoneViewModel
                {
                    TimeZoneId = 5,
                    FullName = "Mountain Standard Time",
                    ShortName = "MST",
                    Offset = "-07:00",
                    IsActive = true
                }
            },
            new AccountDetailViewModel
            {
                AccountId = 6,
                AccountName = "Wellness Inc 6",
                IsActive = true,
                Theme = "default",
                AccountEmail = "contact6@wellnessinc.com",
                PrimaryColorCode = "#FF5733",
                SecondaryColorCode = "#33FF57",
                TertiaryColorCode = "#3357FF",
                AccountLogoUrl = "https://example.com/logos/account6.png",
                IsOigEnable = true,
                IsNursysEnable = true,
                IsSamEnable = true,
                Address1 = "600 Main Street",
                Address2 = "Suite 60",
                City = "Philadelphia",
                State = "PA",
                ZipCode = "19101",
                IsSharePointConnected = true,
                SharePointConnectionError = null,
                Role = "Admin",
                IsDownloadable = true,
                TotalUsers = 6,
                TimeZoneInfo = new TimeZoneViewModel
                {
                    TimeZoneId = 1,
                    FullName = "Eastern Standard Time",
                    ShortName = "EST",
                    Offset = "-05:00",
                    IsActive = true
                }
            },
            new AccountDetailViewModel
            {
                AccountId = 7,
                AccountName = "Medical Systems 7",
                IsActive = false,
                Theme = "dark",
                AccountEmail = "contact7@medicalsystems.com",
                PrimaryColorCode = "#C70039",
                SecondaryColorCode = "#FFC300",
                TertiaryColorCode = "#DAF7A6",
                AccountLogoUrl = "https://example.com/logos/account7.png",
                IsOigEnable = false,
                IsNursysEnable = true,
                IsSamEnable = false,
                Address1 = "700 Elm Street",
                Address2 = null,
                City = "San Antonio",
                State = "TX",
                ZipCode = "78201",
                IsSharePointConnected = false,
                SharePointConnectionError = "Connection failed",
                Role = "Manager",
                IsDownloadable = false,
                TotalUsers = 1,
                TimeZoneInfo = new TimeZoneViewModel
                {
                    TimeZoneId = 2,
                    FullName = "Central Standard Time",
                    ShortName = "CST",
                    Offset = "-06:00",
                    IsActive = true
                }
            },
            new AccountDetailViewModel
            {
                AccountId = 8,
                AccountName = "CarePoint 8",
                IsActive = true,
                Theme = "light",
                AccountEmail = "contact8@carepoint.com",
                PrimaryColorCode = "#900C3F",
                SecondaryColorCode = "#581845",
                TertiaryColorCode = "#FFC0CB",
                AccountLogoUrl = "https://example.com/logos/account8.png",
                IsOigEnable = true,
                IsNursysEnable = false,
                IsSamEnable = true,
                Address1 = "800 Oak Avenue",
                Address2 = "Floor 8",
                City = "San Diego",
                State = "CA",
                ZipCode = "92101",
                IsSharePointConnected = true,
                SharePointConnectionError = null,
                Role = "User",
                IsDownloadable = true,
                TotalUsers = 8,
                TimeZoneInfo = new TimeZoneViewModel
                {
                    TimeZoneId = 2,
                    FullName = "Pacific Standard Time",
                    ShortName = "PST",
                    Offset = "-08:00",
                    IsActive = true
                }
            },
            new AccountDetailViewModel
            {
                AccountId = 9,
                AccountName = "HealthTech 9",
                IsActive = true,
                Theme = "blue",
                AccountEmail = "contact9@healthtech.com",
                PrimaryColorCode = "#1F77B4",
                SecondaryColorCode = "#FF7F0E",
                TertiaryColorCode = "#2CA02C",
                AccountLogoUrl = "https://example.com/logos/account9.png",
                IsOigEnable = false,
                IsNursysEnable = true,
                IsSamEnable = false,
                Address1 = "900 Pine Road",
                Address2 = null,
                City = "Dallas",
                State = "TX",
                ZipCode = "75201",
                IsSharePointConnected = true,
                SharePointConnectionError = null,
                Role = "SuperAdmin",
                IsDownloadable = false,
                TotalUsers = 9,
                TimeZoneInfo = new TimeZoneViewModel
                {
                    TimeZoneId = 3,
                    FullName = "Central Standard Time",
                    ShortName = "CST",
                    Offset = "-06:00",
                    IsActive = true
                }
            },
            new AccountDetailViewModel
            {
                AccountId = 10,
                AccountName = "MediSolutions 10",
                IsActive = false,
                Theme = "green",
                AccountEmail = "contact10@medisolutions.com",
                PrimaryColorCode = "#17BECF",
                SecondaryColorCode = "#BCBD22",
                TertiaryColorCode = "#7F7F7F",
                AccountLogoUrl = "https://example.com/logos/account10.png",
                IsOigEnable = true,
                IsNursysEnable = true,
                IsSamEnable = true,
                Address1 = "1000 Maple Lane",
                Address2 = "Apt 100",
                City = "San Jose",
                State = "CA",
                ZipCode = "95101",
                IsSharePointConnected = false,
                SharePointConnectionError = "Connection failed",
                Role = "Viewer",
                IsDownloadable = true,
                TotalUsers = 2,
                TimeZoneInfo = new TimeZoneViewModel
                {
                    TimeZoneId = 2,
                    FullName = "Pacific Standard Time",
                    ShortName = "PST",
                    Offset = "-08:00",
                    IsActive = true
                }
            },
            new AccountDetailViewModel
            {
                AccountId = 11,
                AccountName = "BioTech Labs 11",
                IsActive = true,
                Theme = "default",
                AccountEmail = "contact11@biotechlabs.com",
                PrimaryColorCode = "#FF5733",
                SecondaryColorCode = "#33FF57",
                TertiaryColorCode = "#3357FF",
                AccountLogoUrl = "https://example.com/logos/account11.png",
                IsOigEnable = true,
                IsNursysEnable = true,
                IsSamEnable = true,
                Address1 = "1100 Main Street",
                Address2 = "Suite 110",
                City = "Austin",
                State = "TX",
                ZipCode = "73301",
                IsSharePointConnected = true,
                SharePointConnectionError = null,
                Role = "Admin",
                IsDownloadable = true,
                TotalUsers = 11,
                TimeZoneInfo = new TimeZoneViewModel
                {
                    TimeZoneId = 3,
                    FullName = "Central Standard Time",
                    ShortName = "CST",
                    Offset = "-06:00",
                    IsActive = true
                }
            },
            new AccountDetailViewModel
            {
                AccountId = 12,
                AccountName = "PharmaGroup 12",
                IsActive = false,
                Theme = "dark",
                AccountEmail = "contact12@pharmagroup.com",
                PrimaryColorCode = "#C70039",
                SecondaryColorCode = "#FFC300",
                TertiaryColorCode = "#DAF7A6",
                AccountLogoUrl = "https://example.com/logos/account12.png",
                IsOigEnable = false,
                IsNursysEnable = true,
                IsSamEnable = false,
                Address1 = "1200 Elm Street",
                Address2 = null,
                City = "Jacksonville",
                State = "FL",
                ZipCode = "32099",
                IsSharePointConnected = false,
                SharePointConnectionError = "Connection failed",
                Role = "Manager",
                IsDownloadable = false,
                TotalUsers = 3,
                TimeZoneInfo = new TimeZoneViewModel
                {
                    TimeZoneId = 1,
                    FullName = "Eastern Standard Time",
                    ShortName = "EST",
                    Offset = "-05:00",
                    IsActive = true
                }
            },
            new AccountDetailViewModel
            {
                AccountId = 13,
                AccountName = "MediCare Solutions 13",
                IsActive = true,
                Theme = "light",
                AccountEmail = "contact13@medicaresolutions.com",
                PrimaryColorCode = "#900C3F",
                SecondaryColorCode = "#581845",
                TertiaryColorCode = "#FFC0CB",
                AccountLogoUrl = "https://example.com/logos/account13.png",
                IsOigEnable = true,
                IsNursysEnable = false,
                IsSamEnable = true,
                Address1 = "1300 Oak Avenue",
                Address2 = "Floor 13",
                City = "Fort Worth",
                State = "TX",
                ZipCode = "76101",
                IsSharePointConnected = true,
                SharePointConnectionError = null,
                Role = "User",
                IsDownloadable = true,
                TotalUsers = 4,
                TimeZoneInfo = new TimeZoneViewModel
                {
                    TimeZoneId = 3,
                    FullName = "Central Standard Time",
                    ShortName = "CST",
                    Offset = "-06:00",
                    IsActive = true
                }
            },
            new AccountDetailViewModel
            {
                AccountId = 14,
                AccountName = "TechCorp 14",
                IsActive = true,
                Theme = "blue",
                AccountEmail = "contact14@techcorp.com",
                PrimaryColorCode = "#1F77B4",
                SecondaryColorCode = "#FF7F0E",
                TertiaryColorCode = "#2CA02C",
                AccountLogoUrl = "https://example.com/logos/account14.png",
                IsOigEnable = false,
                IsNursysEnable = true,
                IsSamEnable = false,
                Address1 = "1400 Pine Road",
                Address2 = null,
                City = "Columbus",
                State = "OH",
                ZipCode = "43215",
                IsSharePointConnected = true,
                SharePointConnectionError = null,
                Role = "SuperAdmin",
                IsDownloadable = false,
                TotalUsers = 6,
                TimeZoneInfo = new TimeZoneViewModel
                {
                    TimeZoneId = 1,
                    FullName = "Eastern Standard Time",
                    ShortName = "EST",
                    Offset = "-05:00",
                    IsActive = true
                }
            },
            new AccountDetailViewModel
            {
                AccountId = 15,
                AccountName = "HealthPlus 15",
                IsActive = false,
                Theme = "green",
                AccountEmail = "contact15@healthplus.com",
                PrimaryColorCode = "#17BECF",
                SecondaryColorCode = "#BCBD22",
                TertiaryColorCode = "#7F7F7F",
                AccountLogoUrl = "https://example.com/logos/account15.png",
                IsOigEnable = true,
                IsNursysEnable = true,
                IsSamEnable = true,
                Address1 = "1500 Maple Lane",
                Address2 = "Apt 150",
                City = "Charlotte",
                State = "NC",
                ZipCode = "28202",
                IsSharePointConnected = false,
                SharePointConnectionError = "Connection failed",
                Role = "Viewer",
                IsDownloadable = true,
                TotalUsers = 1,
                TimeZoneInfo = new TimeZoneViewModel
                {
                    TimeZoneId = 1,
                    FullName = "Eastern Standard Time",
                    ShortName = "EST",
                    Offset = "-05:00",
                    IsActive = true
                }
            }
        };

        public AccountService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public List<AccountDetailViewModel> GetAccountsByUserid(string userId)
        {
            // Dummy data
            return new List<AccountDetailViewModel>
            {
                new AccountDetailViewModel
                {
                    AccountId = 1,
                    AccountName = "Dummy Account",
                    AccountEmail = "admin@dummy.com",
                    IsActive = true,
                    Role = "Admin"
                }
            };
        }

        public ServiceResult<UserListViewModel> CreateUser(CreateUserRequest request)
        {
            // Dummy implementation
            return new ServiceResult<UserListViewModel>
            {
                Success = true,
                Data = new UserListViewModel
                {
                    Id = "dummy-user-id",
                    UserName = request.UserName ?? request.Email,
                    Email = request.Email,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    IsActive = true
                },
                Message = "User created successfully (dummy)"
            };
        }

        public List<UserListViewModel> GetAllUsers(UserListRequestModel obj)
        {
            // Dummy data
            return new List<UserListViewModel>
            {
                new UserListViewModel
                {
                    Id = "dummy-user-id",
                    UserName = "admin",
                    Email = "admin@dummy.com",
                    FirstName = "Admin",
                    LastName = "User",
                    IsActive = true
                }
            };
        }

        public async Task<ServiceResult<UserDetailViewModel>> GetUserByIdAsync(string userId)
        {
            // Dummy data
            return await Task.FromResult(new ServiceResult<UserDetailViewModel>
            {
                Success = true,
                Data = new UserDetailViewModel
                {
                    Id = userId,
                    UserName = "admin",
                    Email = "admin@dummy.com",
                    FirstName = "Admin",
                    LastName = "User",
                    IsActive = true
                }
            });
        }

        public List<TimeZoneViewModel> GetAllTimeZones()
        {
            // Dummy data
            return new List<TimeZoneViewModel>
            {
                new TimeZoneViewModel
                {
                    TimeZoneId = 1,
                    FullName = "Eastern Standard Time",
                    ShortName = "EST",
                    Offset = "-05:00",
                    IsActive = true
                }
            };
        }

        public PaginatedResult<AccountDetailViewModel> GetAllAccounts(AccountFilterRequest request)
        {
            var filtered = _accounts.Where(a =>
                (string.IsNullOrEmpty(request.AccountName) || (a.AccountName != null && a.AccountName.Contains(request.AccountName, StringComparison.OrdinalIgnoreCase))) &&
                (string.IsNullOrEmpty(request.Email)       || (a.AccountEmail != null && a.AccountEmail.Contains(request.Email, StringComparison.OrdinalIgnoreCase)))       &&
                (!request.Status.HasValue                  || a.IsActive == request.Status.Value)           &&
                (string.IsNullOrEmpty(request.City)        || (a.City != null && a.City.Contains(request.City, StringComparison.OrdinalIgnoreCase)))                &&
                (string.IsNullOrEmpty(request.State)       || (a.State != null && a.State.Contains(request.State, StringComparison.OrdinalIgnoreCase)))
            ).ToList();

            int totalCount = filtered.Count;
            int pageNumber = request.PageNumber ?? 1;
            int pageSize   = request.PageSize   ?? 10;
            var paginated  = filtered.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

            return new PaginatedResult<AccountDetailViewModel>
            {
                Data = paginated,
                TotalCount = totalCount
            };
        }

        public AccountDetailViewModel? GetAccountById(int accountId)
        {
            return _accounts.FirstOrDefault(a => a.AccountId == accountId);
        }

        public ServiceResult<AccountDetailViewModel> CreateAccount(CreateAccountRequest request)
        {
            var newId = _accounts.Any() ? _accounts.Max(a => a.AccountId) + 1 : 1;
            var newAccount = new AccountDetailViewModel
            {
                AccountId = newId,
                AccountName = request.AccountName,
                AccountEmail = request.AccountEmail,
                Address1 = request.Address1,
                Address2 = request.Address2,
                City = request.City,
                State = request.State,
                ZipCode = request.ZipCode,
                IsActive = true,
                TotalUsers = 0,
                Role = "Admin"
            };
            _accounts.Add(newAccount);
            return new ServiceResult<AccountDetailViewModel>
            {
                Success = true,
                Data = newAccount,
                Message = "Account created successfully."
            };
        }

        public ServiceResult<bool> UpdateAccount(AccountDetailViewModel account)
        {
            var existingAccount = _accounts.FirstOrDefault(a => a.AccountId == account.AccountId);
            if (existingAccount == null)
            {
                return new ServiceResult<bool>
                {
                    Success = false,
                    Data = false,
                    Message = "Account not found."
                };
            }

            // Update the properties
            existingAccount.AccountName = account.AccountName;
            existingAccount.IsActive = account.IsActive;
            existingAccount.Theme = account.Theme;
            existingAccount.AccountEmail = account.AccountEmail;
            existingAccount.PrimaryColorCode = account.PrimaryColorCode;
            existingAccount.SecondaryColorCode = account.SecondaryColorCode;
            existingAccount.TertiaryColorCode = account.TertiaryColorCode;
            existingAccount.AccountLogoUrl = account.AccountLogoUrl;
            existingAccount.IsOigEnable = account.IsOigEnable;
            existingAccount.IsNursysEnable = account.IsNursysEnable;
            existingAccount.IsSamEnable = account.IsSamEnable;
            existingAccount.Address1 = account.Address1;
            existingAccount.Address2 = account.Address2;
            existingAccount.City = account.City;
            existingAccount.State = account.State;
            existingAccount.ZipCode = account.ZipCode;
            existingAccount.IsSharePointConnected = account.IsSharePointConnected;
            existingAccount.SharePointConnectionError = account.SharePointConnectionError;
            existingAccount.Role = account.Role;
            existingAccount.IsDownloadable = account.IsDownloadable;
            existingAccount.TimeZoneInfo = account.TimeZoneInfo;

            return new ServiceResult<bool>
            {
                Success = true,
                Data = true,
                Message = "Account updated successfully."
            };
        }

        public ServiceResult<bool> UpdateAccountInfo(UpdateAccountInfoRequest request, int accountId)
        {
            var existingAccount = _accounts.FirstOrDefault(a => a.AccountId == accountId);
            if (existingAccount == null)
            {
                return new ServiceResult<bool>
                {
                    Success = false,
                    Data = false,
                    Message = "Account not found."
                };
            }

            // Update only the specified fields
            if (request.AccountName != null) existingAccount.AccountName = request.AccountName;
            if (request.AccountEmail != null) existingAccount.AccountEmail = request.AccountEmail;
            if (request.Address1 != null) existingAccount.Address1 = request.Address1;
            if (request.Address2 != null) existingAccount.Address2 = request.Address2;
            if (request.City != null) existingAccount.City = request.City;
            if (request.State != null) existingAccount.State = request.State;
            if (request.ZipCode != null) existingAccount.ZipCode = request.ZipCode;

            // Note: User fields (userEmail, userFirstName, userLastName, checksId) are not updated here as they are not part of AccountDetailViewModel
            // Assuming they might be for a user associated with the account, but for now, ignoring them.

            return new ServiceResult<bool>
            {
                Success = true,
                Data = true,
                Message = "Account info updated successfully."
            };
        }

        public ServiceResult<bool> UpdateSharepointConfigurations(UpdateSharepointConfigurationsRequest request)
        {
            var existingAccount = _accounts.FirstOrDefault(a => a.AccountId == request.AccountId);
            if (existingAccount == null)
            {
                return new ServiceResult<bool>
                {
                    Success = false,
                    Data = false,
                    Message = "Account not found."
                };
            }

            if (existingAccount.SharepointConfigurations == null)
            {
                existingAccount.SharepointConfigurations = new SharepointConfigurations
                {
                    Id = request.SharepointId ?? 0,
                    AccountId = request.AccountId,
                    IsActive = true,
                    CreatedDate = DateTime.Now
                };
            }

            // Update the SharePoint configurations
            if (request.SiteUrl != null) existingAccount.SharepointConfigurations.SiteUrl = request.SiteUrl;
            if (request.UserName != null) existingAccount.SharepointConfigurations.UserName = request.UserName;
            if (request.Password != null) existingAccount.SharepointConfigurations.Password = request.Password;
            if (request.AppId != null) existingAccount.SharepointConfigurations.AppId = request.AppId;
            if (request.ClientSecret != null) existingAccount.SharepointConfigurations.ClientSecret = request.ClientSecret;
            if (request.DefaultFolderPath != null) existingAccount.SharepointConfigurations.DefaultFolderPath = request.DefaultFolderPath;

            existingAccount.SharepointConfigurations.ModifiedDate = DateTime.Now;

            return new ServiceResult<bool>
            {
                Success = true,
                Data = true,
                Message = "SharePoint configurations updated successfully."
            };
        }

        public ServiceResult<bool> UpdateAccountStatus(UpdateAccountStatusRequest request)
        {
            var existingAccount = _accounts.FirstOrDefault(a => a.AccountId == request.AccountId);
            if (existingAccount == null)
            {
                return new ServiceResult<bool>
                {
                    Success = false,
                    Data = false,
                    Message = $"Account with ID {request.AccountId} not found."
                };
            }

            existingAccount.IsActive = request.IsActive;

            return new ServiceResult<bool>
            {
                Success = true,
                Data = true,
                Message = $"Account '{existingAccount.AccountName}' has been {(request.IsActive ? "activated" : "deactivated")} successfully."
            };
        }
    }

    public interface IAccountService
    {
        List<AccountDetailViewModel> GetAccountsByUserid(string userId);
        ServiceResult<UserListViewModel> CreateUser(CreateUserRequest request);
        List<UserListViewModel> GetAllUsers(UserListRequestModel obj);
        Task<ServiceResult<UserDetailViewModel>> GetUserByIdAsync(string userId);
        List<TimeZoneViewModel> GetAllTimeZones();
        PaginatedResult<AccountDetailViewModel> GetAllAccounts(AccountFilterRequest request);
        AccountDetailViewModel? GetAccountById(int accountId);
        ServiceResult<AccountDetailViewModel> CreateAccount(CreateAccountRequest request);
        ServiceResult<bool> UpdateAccount(AccountDetailViewModel account);
        ServiceResult<bool> UpdateAccountInfo(UpdateAccountInfoRequest request, int accountId);
        ServiceResult<bool> UpdateSharepointConfigurations(UpdateSharepointConfigurationsRequest request);
        ServiceResult<bool> UpdateAccountStatus(UpdateAccountStatusRequest request);
    }

    public class PaginatedResult<T>
    {
        public List<T> Data { get; set; } = new();
        public int TotalCount { get; set; }
    }

    public class AccountFilterRequest
    {
        public int? PageNumber { get; set; } = 1;
        public int? PageSize { get; set; } = 5;
        public string? AccountName { get; set; }
        public string? Email { get; set; }
        public bool? Status { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
    }
}