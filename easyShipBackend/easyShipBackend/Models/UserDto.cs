namespace easyShipBackend.Models
{
    public class UserDto
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
        public string Email { get; set; } // Add Email field
        public string Storename { get; set; } // Add Storename field
        public string Role { get; set; } = string.Empty;
        public bool Verified { get; set; }
        public string VerificationToken { get; set; }
        public string ResetPasswordToken { get; set; }
        public DateTime? ResetPasswordTokenExpiration { get; set; }
    }
}
