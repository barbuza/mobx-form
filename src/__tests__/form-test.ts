import { ArrayForm, CustomValidation, NestedForm, PlainForm } from "./forms";

describe("form", () => {

  it("plain", () => {
    const form = new PlainForm();
    expect(form.fields.foo.value).toBe("");
    expect(form.fields.bar.value).toBe(0);
    expect(form.fields.spam.value).toBe(false);

    expect(form.isValid).toBe(false);

    form.fields.foo.value = "  ";
    expect(form.isValid).toBe(false);

    form.fields.foo.value = "foo";
    expect(form.isValid).toBe(true);

    expect(form.value).toEqual({
      bar: 0,
      foo: "foo",
      spam: false,
    });

    form.value = {
      bar: 1,
      foo: "spam",
      spam: true,
    };

    expect(form.isValid).toBe(true);
    expect(form.fields.foo.value).toBe("spam");
    expect(form.fields.bar.value).toBe(1);
    expect(form.fields.spam.value).toBe(true);
  });

  it("nested", () => {
    const form = new NestedForm();
    expect(form.isValid).toBe(false);

    expect(form.value).toEqual({
      plain: {
        bar: 0,
        foo: "",
        spam: false,
      },
    });

    form.value = {
      plain: {
        bar: 1,
        foo: "spam",
        spam: true,
      },
    };

    expect(form.isValid).toBe(true);
    expect(form.fields.plain.value).toEqual({
      bar: 1,
      foo: "spam",
      spam: true,
    });
  });

  it("array", () => {
    const form = new ArrayForm();
    expect(form.isValid).toBe(true);
    expect(form.value).toEqual({ eggs: "", plains: [] });

    form.value = {
      eggs: "",
      plains: [{
        bar: 0,
        foo: "",
        spam: false,
      }],
    };
    expect(form.isValid).toBe(false);

    form.value = {
      eggs: "test",
      plains: [{
        bar: 1,
        foo: "eggs",
        spam: true,
      }],
    };
    expect(form.isValid).toBe(true);

    form.fields.plains.fields[0].fields.bar.value = 10;
    expect(form.value).toEqual({
      eggs: "test",
      plains: [{
        bar: 10,
        foo: "eggs",
        spam: true,
      }],
    });

    form.fields.plains.push();
    expect(form.value).toEqual({
      eggs: "test",
      plains: [{
        bar: 10,
        foo: "eggs",
        spam: true,
      }, {
        bar: 0,
        foo: "",
        spam: false,
      }],
    });

    form.fields.plains.remove(0);
    expect(form.value).toEqual({
      eggs: "test",
      plains: [{
        bar: 0,
        foo: "",
        spam: false,
      }],
    });
  });

  it("custom validation", () => {
    const form = new CustomValidation();
    expect(form.isValid).toBe(false);
    form.value = {
      bar: "123",
      foo: "",
    };
    expect(form.isValid).toBe(true);
  });

});
