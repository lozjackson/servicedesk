import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('service:sp-services', 'Unit | Service | sp services', {
});

test('it exists', function(assert) {
  var service = this.subject();
  assert.ok(service);
});

test('getCurrentUser() method', function(assert) {
  assert.expect(8);
  var service = this.subject();
  service.set('_SPServices', {
    SPGetCurrentUser: (obj) => {
      assert.equal(obj.fieldNames.length, 3);
      assert.equal(obj.fieldNames[0], 'Id');
      assert.equal(obj.fieldNames[1], 'Title');
      assert.equal(obj.fieldNames[2], 'EMail');
      return {
        Id: 10,
        Title: 'Test User',
				EMail: 'test.user@example.com'
			};
    }
  });

  let user = service.getCurrentUser();
  assert.ok(service);
  assert.equal(user.get('id'), 10);
  assert.equal(user.get('title'), 'Test User');
  assert.equal(user.get('email'), 'test.user@example.com');
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
