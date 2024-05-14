﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace easyShipBackend.Models
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Storename { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public bool Verified { get; set; } // Nullable bool
        public string VerificationToken { get; set; } // Nullable string
        public string ResetPasswordToken { get; set; } // Nullable string
        public DateTime? ResetPasswordTokenExpiration { get; set; }
        public DateTime? CreateAT { get; set; }



    }
    public class UpdateRole
    {
        public int Id { get; set; }
        public string Role { get; set; }



    }
}
