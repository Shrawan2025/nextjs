// Get -> read data
export function GET(Request, { params }) {
  return Response.json({
    success: true,
    message: "GET request (read data)",
    userId: params.id,
  });
}

// Update -> update data
export function PUT(Request, { params }) {
  return Response.json({
    success: true,
    message: "PUT request (update data)",
    userId: params.id,
  });
}

// delete -> delete data
export function DELETE(Request, { params }) {
  return Response.json({
    success: true,
    message: "DELETE request (delete data)",
  });
}
