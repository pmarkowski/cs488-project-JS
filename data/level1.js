// A spooky scene in the woods, illuminated by a campfire

var level = new Level();

level.gravity = 15;
// level:set_gravity(0)
level.backgroundColour = new THREE.Color(0.0, 0.0, 0.0);

// set lighting
level.ambientLight(0.01, 0.01, 0.01)

var campLight = new Light(Light.LightType.POINT, new THREE.Color(1, 0.3, 0.0), [0, 0.0, 0.003]);
level.addLight(campLight)
// campLight:translate(-8.0, -4.0, 5.0)

// level geometry
var noanim = "data/animations/nil_animation.lua";

var skycube = new Gameobject("data/scenes/starCube.lua", noanim, false)
skycube.scale(900, 900, 900);
level.addGameobject(skycube);

var grassFloor = new Gameobject("data/scenes/grassCube.lua", noanim)
grassFloor.scale(100, 0.1, 100);
level.addGameobject(grassFloor);

var tree1 = new Gameobject("data/scenes/tree.lua", noanim);
tree1.translate(-20, 0, 0);
tree1.scale(4, 1, 4);
level.addGameobject(tree1);

var tree2 = new Gameobject("data/scenes/tree.lua", noanim);
tree2.translate(-5, 0, -16);
tree2.scale(2, 1, 2);
level.addGameobject(tree2);

var goalflag = new Gameobject("data/scenes/flagpole.lua", noanim);
goalflag.translate(0, 0, -30);
level.setGoal(goalflag);

// player
var puppetObject = new Gameobject("data/scenes/puppet.lua", "data/animations/puppet_animation.lua");
puppetObject.translate(3, 10, 5);
level.setPlayer(puppetObject);

var campfire = new Gameobject("data/scenes/campfire.lua", noanim);
level.addGameobject(campfire);

// camera
var camera = new Camera();
level.setCamera(camera);
camera.translate(0.0, 7.0, 16.0);

level.setNextLevel("data/level2.lua");

// return the level we've created
return level;