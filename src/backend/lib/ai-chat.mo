import Types "../types/ai-chat";
import Runtime "mo:core/Runtime";

module {
  /// Builds the JSON request body for the AI API call
  public func buildRequestBody(message : Text) : Text {
    Runtime.trap("not implemented");
  };

  /// Parses the raw JSON response text from the AI API and extracts the reply text
  public func parseResponseText(raw : Text) : Text {
    Runtime.trap("not implemented");
  };
};
