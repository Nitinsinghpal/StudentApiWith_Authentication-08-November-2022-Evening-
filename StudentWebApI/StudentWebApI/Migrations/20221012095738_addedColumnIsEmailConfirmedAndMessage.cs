using Microsoft.EntityFrameworkCore.Migrations;

namespace StudentWebApI.Migrations
{
    public partial class addedColumnIsEmailConfirmedAndMessage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsEmailConfirmed",
                table: "Registers",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsEmailConfirmed",
                table: "Registers");
        }
    }
}
