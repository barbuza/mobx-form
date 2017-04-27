import { Field } from "../index";
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

  it("transform", () => {
    const transformField = new Field("", [], [(val) => val.toUpperCase(), (val) => `foo${val}`]);
    transformField.value = "foo";
    expect(transformField.value).toBe("fooFOO");

    Field.useStaticRendering(true);

    const transformFieldServer = new Field("", [], [(val) => val.toUpperCase(), (val) => `foo${val}`]);
    transformFieldServer.value = "foo";
    expect(transformFieldServer.value).toBe("foo");

    Field.useStaticRendering(false);
  });

  it("version", () => {
    const field = new Field("");
    expect(field.version).toBe(0);
    field.value = "test";
    expect(field.version).toBe(1);
    field.value = "";
    expect(field.version).toBe(2);
    field.value = "";
    expect(field.version).toBe(2);
  });

  it("object version", () => {
    const obj = new PlainForm();
    expect(obj.version).toBe(0);
    obj.fields.bar.value = 1;
    expect(obj.version).toBe(1);
    obj.fields.bar.value = 1;
    expect(obj.version).toBe(1);
    obj.fields.foo.value = "";
    expect(obj.version).toBe(1);
    obj.fields.foo.value = "foo";
    expect(obj.version).toBe(2);
    obj.fields.bar.value = 2;
    expect(obj.version).toBe(3);

    obj.value = {
      bar: 3,
      foo: "bar",
      spam: true,
    };
    expect(obj.version).toBe(4);

    obj.value = {
      bar: 3,
      foo: "bar",
      spam: true,
    };
    expect(obj.version).toBe(4);

    obj.value = {
      bar: 4,
      foo: "bar",
      spam: true,
    };
    expect(obj.version).toBe(5);

    obj.value = {
      bar: 4,
      foo: "spam",
      spam: false,
    };
    expect(obj.version).toBe(6);

    obj.value = {
      bar: 5,
      foo: "eggs",
      spam: true,
    };
    expect(obj.version).toBe(7);
  });

  it("array version", () => {
    const ary = new ArrayForm().fields.plains;
    expect(ary.version).toBe(0);
    ary.push();
    expect(ary.version).toBe(1);
    ary.push();
    expect(ary.version).toBe(2);
    ary.remove(0);
    expect(ary.version).toBe(3);

    ary.fields[0].fields.bar.value = 1;
    expect(ary.version).toBe(4);

    ary.fields[0].fields.bar.value = 1;
    expect(ary.version).toBe(4);

    ary.remove(0);
    expect(ary.version).toBe(5);

    ary.push();
    expect(ary.version).toBe(6);

    ary.fields[0].fields.bar.value = 1;
    expect(ary.version).toBe(7);

    ary.value = [
      { bar: 1, foo: "123123", spam: true },
      { bar: 2, foo: "", spam: false },
    ];
    expect(ary.version).toBe(8);

    ary.value = [
      { bar: 1, foo: "123123", spam: true },
      { bar: 2, foo: "", spam: false },
    ];
    expect(ary.version).toBe(8);

    ary.value = [
      { bar: 1, foo: "123123", spam: true },
      { bar: 3, foo: "sdfsdfsdf", spam: false },
    ];
    expect(ary.version).toBe(9);

    ary.value = [
      { bar: 25, foo: "123123", spam: true },
    ];
    expect(ary.version).toBe(10);

    ary.value = [];
    expect(ary.version).toBe(11);

    ary.push();
    ary.push();
    expect(ary.version).toBe(13);

    ary.value = [];
    expect(ary.version).toBe(14);
  });
});
