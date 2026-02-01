// Get -> read data
export function GET() {
  return Response.json({
    success: true,
    message: "GET request (read data)",
  });
}

// Post -> post data
export function POST() {
  return Response.json({
    success: true,
    message: "POST request (create data)",
  });
}

// Update -> update data
export function PUT() {
  return Response.json({
    success: true,
    message: "PUT request (update data)",
  });
}

// delete -> delete data
export function DELETE() {
  return Response.json({
    success: true,
    message: "DELETE request (delete data)",
  });
}
