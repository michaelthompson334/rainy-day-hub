module {
  /// A single chat request from the user
  public type ChatRequest = {
    message : Text;
  };

  /// A single chat response returned to the user
  public type ChatResponse = {
    reply : Text;
  };
};
