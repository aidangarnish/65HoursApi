namespace _65Hours.Repository.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class userskill_skill_fk : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.UserSkills", "SkillId");
            AddForeignKey("dbo.UserSkills", "SkillId", "dbo.Skills", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserSkills", "SkillId", "dbo.Skills");
            DropIndex("dbo.UserSkills", new[] { "SkillId" });
        }
    }
}
