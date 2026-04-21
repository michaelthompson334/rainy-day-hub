import Types "../types/ai-chat";
import AiChatLib "../lib/ai-chat";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Runtime "mo:core/Runtime";

mixin () {
  /// Public query transform callback required by the IC HTTP outcalls mechanism
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    Runtime.trap("not implemented");
  };

  /// Accepts a user message and returns an AI-generated text reply.
  /// Stateless — nothing is persisted server-side.
  public func chat(request : Types.ChatRequest) : async Types.ChatResponse {
    Runtime.trap("not implemented");
  };
};
