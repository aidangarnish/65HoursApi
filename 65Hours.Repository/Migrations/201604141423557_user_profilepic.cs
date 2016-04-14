namespace _65Hours.Repository.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class user_profilepic : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "ProfilePic", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "ProfilePic");
        }
    }
}
