// __tests__/bookController.test.ts
import request from "supertest";
import app from "../../src/server";
import Book from "../../src/models/book.model";
jest.mock("../src/models/Book"); // Mock the database model

describe("DELETE /books/:id", () => {
  it("should return 400 if no ID is provided", async () => {
    const response = await request(app).delete("/books/");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Invalid request" });
  });

  it("should delete a book and return a success message", async () => {
    const mockBook = { _id: "12345", title: "Mock Book" };

    (Book.findOneAndDelete as jest.Mock).mockResolvedValue(mockBook);

    const response = await request(app).delete("/books/12345");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: `${mockBook.title} deleted successfully`,
      deletedBook: mockBook,
    });
  });
});
