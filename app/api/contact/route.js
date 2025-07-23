export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Validate form inputs
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields are required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Log the submission details to the console for debugging(optional)
    console.log(`Contact form submission from ${name} (${email}): ${message}`);
    
    // EmailJS handles the actual email sending from the client side
    // This endpoint provides server-side validation and logging
    
    return new Response( // This is a response object that allows us to send a response to the client side if 
    // the request is successful
      JSON.stringify({ 
        success: true, // Success will be sent to the client side if the request is successful
        message: "Message sent successfully", // Message sent successfully will be sent to the client side if the request is successful
        recipient: "jacobjayenpillai@gmail.com" // Recipient will be sent to the client side if the request is successful, if not 
        // then the error message "Failed to send message" will be sent to the client side
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Failed to send message" 
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
} 