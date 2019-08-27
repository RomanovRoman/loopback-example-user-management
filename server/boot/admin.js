const debug = require('debug')('on-boot');

module.exports = function(app) {
  const User = app.models.User;
  const Role = app.models.Role;
  const RoleMapping = app.models.RoleMapping;
  // User.create({email: 'foo@bar.com', password: 'bar'}, function(err, userInstance) {
  //   console.log(userInstance);
  // });

  console.log('admin-on');
  User.create([
    {username: 'John', email: 'john@doe.com', password: 'opensesame'},
    {username: 'Jane', email: 'jane@doe.com', password: 'opensesame'},
    {username: 'Bob', email: 'bob@projects.com', password: 'opensesame'}
  ], function(err, users) {
    if (err) return debug('%j', err);
    //...
    // Create projects, assign project owners and project team members
    //...
    // Create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) return debug(err);
      debug(role);

      // Make Bob an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[2].id
      }, function(err, principal) {
        if (err) return debug(err);
        debug(principal);
      });
    });
  });
}
