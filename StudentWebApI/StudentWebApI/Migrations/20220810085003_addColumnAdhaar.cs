using Microsoft.EntityFrameworkCore.Migrations;

namespace StudentWebApI.Migrations
{
    public partial class addColumnAdhaar : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AdhaarNo",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdhaarNo",
                table: "Students");
        }
    }
}
