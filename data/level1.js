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

skycube = gr.gameobject('data/scenes/starCube.lua', noanim, false)
skycube:scale(900, 900, 900)
level:add_gameobject(skycube)


grassFloor = gr.gameobject('data/scenes/grassCube.lua', noanim)
grassFloor:scale(100, 0.1, 100)
level:add_gameobject(grassFloor)

tree1 = gr.gameobject('data/scenes/tree.lua', noanim)
tree1:translate(-20, 0, 0)
tree1:scale(4, 1, 4)
level:add_gameobject(tree1)

tree2 = gr.gameobject('data/scenes/tree.lua', noanim)
tree2:translate(-5, 0, -16)
tree2:scale(2, 1, 2)
level:add_gameobject(tree2)

goalflag = gr.gameobject('data/scenes/flagpole.lua', noanim)
goalflag:translate(0, 0, -30)
level:set_goal(goalflag)

// player
puppetObject = gr.gameobject('data/scenes/puppet.lua', 'data/animations/puppet_animation.lua')
puppetObject:translate(3, 10, 5)
level:set_player(puppetObject)

campfire = gr.gameobject('data/scenes/campfire.lua', noanim)
level:add_gameobject(campfire)

// camera
camera = gr.camera()
level:set_camera(camera)
camera:translate(0.0, 7.0, 16.0)

level:set_next_level("data/level2.lua")

// return the level we've created
return level;