import "./InputFile";
import { InputFile } from "./InputFile";
import { fixture, fixtureCleanup, elementUpdated } from "@open-wc/testing-helpers";
import { html } from "lit-element";
import { Button } from "@/components/button/Button";

describe("InputFile component", () => {
  let element: InputFile;

  afterEach(fixtureCleanup);

  beforeEach(async () => {
    element = await fixture<InputFile>(
      html`
        <md-input-file></md-input-file>
      `
    );
  });

  test("should render input file", async () => {
    expect(element).toBeDefined();
  });

  test("should check acceptable lang", async () => {
    element.acceptLanguage = "Jabascript";

    const spyWarn = jest.spyOn(console, "warn");

    await elementUpdated(element);

    expect(spyWarn).toHaveBeenCalledWith("Please set correct language name");
    spyWarn.mockRestore();
  });

  test("should trigger input click", async () => {
    const mdButton = element.shadowRoot!.querySelector(".md-input-file-btn") as Button;
    const button = mdButton.shadowRoot!.querySelector("button");

    button!.click();
    element.input.dispatchEvent(new Event("change"));
    await elementUpdated(element);
  });

});
