import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit feedback", async () => {
    await expect(
      submitFeedback.execute({
        comment: "test example",
        screenshot: "data:image/png;base64,o2fdw23sj4ke32rt6wkr43je",
        type: "BUG",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        comment: "test example",
        screenshot: "data:image/png;base64,o2fdw23sj4ke32rt6wkr43je",
        type: "",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        comment: "",
        screenshot: "data:image/png;base64,o2fdw23sj4ke32rt6wkr43je",
        type: "BUG",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback with a invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        comment: "test example",
        screenshot: "image.jpg",
        type: "BUG",
      })
    ).rejects.toThrow();
  });
});
