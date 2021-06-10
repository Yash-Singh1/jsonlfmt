const jsonlfmt = require('../index.js');
var should = require('should');

describe('objects', function () {
  it('should format normal objects like JSON.stringify', function () {
    jsonlfmt('{}').should.equal(JSON.stringify({}));
    jsonlfmt('\t\t\n{}\n').should.equal(JSON.stringify({}));
    jsonlfmt('\t\t\n{"a": "fadskjlfjas",       \t"dude": 8}\n').should.equal(
      JSON.stringify(
        {
          a: 'fadskjlfjas',
          dude: 8
        },
        null,
        2
      )
    );
  });

  it('should format multiple objects', function () {
    jsonlfmt('{}{}{}{}').should.equal('{}\n{}\n{}\n{}');
    jsonlfmt(
      '\t\t\n{"a": "fadskjlfjas",       \t"dude": 8}\n{\t"something":  \t\nnull}'
    ).should.equal(`{
  "a": "fadskjlfjas",
  "dude": 8
}
{
  "something": null
}`);
  });
});

describe('arrays', function () {
  it('should format normal arrays like JSON.stringify', function () {
    jsonlfmt('[]').should.equal(JSON.stringify([]));
    jsonlfmt('\t\n\n\t\t\n\n[\n\t\n"abc"]\n\t').should.equal(
      JSON.stringify(['abc'], null, 2)
    );
  });

  it('should format multiple arrays', function () {
    jsonlfmt(
      '[\t  ]\n[4, 32, 54, "null", null, "fasln"]\t[{"something": ["called an array"]}]'
    ).should.equal(`[]
[
  4,
  32,
  54,
  "null",
  null,
  "fasln"
]
[
  {
    "something": [
      "called an array"
    ]
  }
]`);
  });
});

describe('strings', function () {
  it('should format normal strings like JSON.stringify', function () {
    jsonlfmt('"abc"').should.equal(JSON.stringify('abc'));
    jsonlfmt('"  abcfsf"').should.equal(JSON.stringify('  abcfsf'));
  });

  it('should format multiple strings', function () {
    jsonlfmt('"alfjafnlal  "\n"  adfak "\t\n"asf"').should.equal(`"alfjafnlal  "
"  adfak "
"asf"`);
  });
});

describe('numbers', function () {
  it('should format normal numbers like JSON.stringify', function () {
    jsonlfmt('734').should.equal(JSON.stringify(734));
    jsonlfmt('8453.54').should.equal(JSON.stringify(8453.54));
    jsonlfmt('\t\n\n\t8453.54\t  \n').should.equal(JSON.stringify(8453.54));
  });

  it('should format multiple numbers', function () {
    jsonlfmt('75934 \n\t\n78').should.equal(`75934
78`);
    jsonlfmt('78534.834\t\n-42.54').should.equal(`78534.834
-42.54`);
  });
});

describe('booleans', function () {
  it('should format normal booleans like JSON.stringify', function () {
    jsonlfmt('true').should.equal(JSON.stringify(true));
    jsonlfmt('  \nfalse\t\n').should.equal(JSON.stringify(false));
  });

  it('should format multiple booleans', function () {
    jsonlfmt('true\n\n\t\n  \n\t \n true\n').should.equal(`true
true`);
    jsonlfmt(' true\n\tfalse').should.equal(`true
false`);
  });
});

describe('null', function () {
  it('should format normal null like JSON.stringify', function () {
    jsonlfmt('null').should.equal(JSON.stringify(null));
    jsonlfmt('\t\nnull\n\t\t').should.equal(JSON.stringify(null));
  });

  it('should format multiple nulls', function () {
    jsonlfmt('null\n\n\t\n  \n\t \n null\n').should.equal(`null
null`);
    jsonlfmt(' null\n\tnull').should.equal(`null
null`);
  });
});

describe('spacing', function () {
  it('should space tabs when told', function () {
    jsonlfmt('{"a":"b"}', '\t').should.equal('{\n\t"a": "b"\n}');
  });
});
