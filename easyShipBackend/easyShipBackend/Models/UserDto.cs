namespace easyShipBackend.Models
{
    public class UserDto
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
        public string Email { get; set; } // Add Email field
        public string Storename { get; set; } // Add Storename field
    }
}
