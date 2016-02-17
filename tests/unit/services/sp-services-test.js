import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('service:sp-services', 'Unit | Service | sp services', {
});

test('it exists', function(assert) {
  var service = this.subject();
  assert.ok(service);
});

test('getCurrentUser() method', function(assert) {
  assert.expect(10);
  var service = this.subject();
  service.set('_SPServices', {
    SPGetCurrentUser: (obj) => {
      assert.equal(obj.fieldNames.length, 4);
      assert.equal(obj.fieldNames[0], 'ID');
      assert.equal(obj.fieldNames[1], 'Name');
      assert.equal(obj.fieldNames[2], 'Title');
      assert.equal(obj.fieldNames[3], 'EMail');
      return {
        ID: 10,
        Name: `DOMAIN\Test.User`,
        Title: 'Test User',
				EMail: 'test.user@example.com'
			};
    }
  });

  let user = service.getCurrentUser();
  assert.ok(service);
  assert.equal(user.get('id'), 10);
  assert.equal(user.get('name'), `DOMAIN\Test.User`);
  assert.equal(user.get('title'), 'Test User');
  assert.equal(user.get('eMail'), 'test.user@example.com');
});

test('getVersionCollection() method', function(assert) {
  assert.expect(8);
  var service = this.subject();
  let listName = 'testList';
  let itemId = 1;
  let fieldName = 'fieldName';
  let versionCollection = [];
  let xml = `<Version>
    <Comment>Abc</Comment>
    <Modified>2015-11-13T10:21:02Z</Modified>
    <Editor>11;#Test User,#DOMAIN\test.user,#test.user@example.com,#,#Test User</Editor>
  </Version>`;

  service.set('_SPServices', (obj) => {
    assert.equal(obj.operation, 'GetVersionCollection');
    assert.equal(obj.async, true);
    assert.equal(obj.strlistID, listName);
    assert.equal(obj.strlistItemID, itemId);
    assert.equal(obj.strFieldName, fieldName);
    assert.equal(typeof obj.completefunc, 'function');

    obj.completefunc({
      responseText: Ember.$.parseXML(xml)
    });
  });

  service.getVersionCollection(listName, itemId, fieldName, versionCollection);
  assert.ok(service);
  assert.equal(versionCollection.length, 1, `should be 1 version`);
  // assert.equal(versionCollection.objectAt(0).get('comment'), 'Abc');
});
