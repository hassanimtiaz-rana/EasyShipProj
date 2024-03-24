namespace easyShipBackend.Models
{
    public class HelpRequest
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
        public string Storename { get; set; }
        public string Type { get; set; }

        public string Status { get; set; }
        public DateTime Time { get; set; }
    }
    public class UpdateStatusRequest
    {
        public string Status { get; set; }
    }

}
