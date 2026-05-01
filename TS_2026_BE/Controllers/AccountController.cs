using HealthCareInnovation_Model.Model;
using HealthCareInnovation_Model.ViewModel;
using HealthCareInnovation_Services.Healthcare_Automation;
using Microsoft.AspNetCore.Mvc;

namespace HealthCareInnovation_Services.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetAccountsByUserId(string userId)
        {
            var result = _accountService.GetAccountsByUserid(userId);
            return Ok(result);
        }

        [HttpPost("list")]
        public IActionResult GetAllAccounts([FromBody] AccountFilterRequest request)
        {
            var result = _accountService.GetAllAccounts(request);
            return Ok(result);
        }

        [HttpPost("create")]
        public IActionResult CreateAccount([FromBody] CreateAccountRequest request)
        {
            var result = _accountService.CreateAccount(request);
            return Ok(result);
        }

        [HttpGet("{accountId}")]
        public IActionResult GetAccountById(int accountId)
        {
            // Return account from in-memory list via filter
            var result = _accountService.GetAllAccounts(new AccountFilterRequest { PageNumber = 1, PageSize = 100 });
            var account = result.FirstOrDefault(a => a.AccountId == accountId);
            if (account == null) return NotFound();
            return Ok(account);
        }

        [HttpPut("update")]
        public IActionResult UpdateAccount([FromBody] AccountDetailViewModel account)
        {
            var result = _accountService.UpdateAccount(account);
            return Ok(result);
        }

        [HttpPut("{accountId}/info")]
        public IActionResult UpdateAccountInfo(int accountId, [FromBody] UpdateAccountInfoRequest request)
        {
            var result = _accountService.UpdateAccountInfo(request, accountId);
            return Ok(result);
        }

        [HttpPut("sharepoint")]
        public IActionResult UpdateSharepointConfigurations([FromBody] UpdateSharepointConfigurationsRequest request)
        {
            var result = _accountService.UpdateSharepointConfigurations(request);
            return Ok(result);
        }

        [HttpPost("users")]
        public IActionResult GetAllUsers([FromBody] UserListRequestModel request)
        {
            var result = _accountService.GetAllUsers(request);
            return Ok(result);
        }

        [HttpPost("users/create")]
        public IActionResult CreateUser([FromBody] CreateUserRequest request)
        {
            var result = _accountService.CreateUser(request);
            return Ok(result);
        }

        [HttpGet("users/{userId}")]
        public async Task<IActionResult> GetUserById(string userId)
        {
            var result = await _accountService.GetUserByIdAsync(userId);
            return Ok(result);
        }

        [HttpGet("timezones")]
        public IActionResult GetAllTimeZones()
        {
            var result = _accountService.GetAllTimeZones();
            return Ok(result);
        }

        [HttpPut("status")]
        public IActionResult UpdateAccountStatus([FromBody] UpdateAccountStatusRequest request)
        {
            var result = _accountService.UpdateAccountStatus(request);
            if (!result.Success)
                return NotFound(new { errorMessage = result.Message });
            return Ok(result);
        }
    }
}
