(function EFB2Mod() {

        function EFB2__defineExecCmdAsGlobal() {
            var getServer = ModAPI.reflect.getClassById("net.minecraft.server.MinecraftServer").staticMethods.getServer.method;
            globalThis.efb2__executeCommandAs = function efb2__executeCommandAs($commandsender, command, feedback) {
                var server = getServer();
                if (!server) { return };
                var commandManager = server.$commandManager;

                //lie a bit
                var x = $commandsender.$canCommandSenderUseCommand;
                $commandsender.$canCommandSenderUseCommand = () => 1;

                var y = $commandsender.$sendCommandFeedback;
                $commandsender.$sendCommandFeedback = feedback ? () => 1 : () => 0;

                try {
                    commandManager.$executeCommand($commandsender, ModAPI.util.str(command));
                } catch (error) {
                    console.error(error);
                }

                $commandsender.$canCommandSenderUseCommand = x;
                $commandsender.$sendCommandFeedback = y;
            }
        }
        ModAPI.dedicatedServer.appendCode(EFB2__defineExecCmdAsGlobal);
        EFB2__defineExecCmdAsGlobal();
    
        function EFB2__defineExecCmdGlobal() {
            globalThis.efb2__executeCommand = function efb2__executeCommand($world, $blockpos, commandStr, feedback) {
                if ($world.$isRemote) {
                    return;
                }
                function x() {
                    ModAPI.reflect.getSuper(ModAPI.reflect.getClassByName("CommandBlockLogic"))(this);
                }
                ModAPI.reflect.prototypeStack(ModAPI.reflect.getClassByName("CommandBlockLogic"), x);
                var vector = ModAPI.reflect.getClassByName("Vec3").constructors[0]($blockpos.$x + 0.5, $blockpos.$y + 0.5, $blockpos.$z + 0.5);
                x.prototype.$getEntityWorld = () => { return $world };
                x.prototype.$getCommandSenderEntity = () => { return null };
                x.prototype.$updateCommand = () => { };
                x.prototype.$addChatMessage = (e) => { console.log(e) };
                x.prototype.$func_145757_a = () => { };
                x.prototype.$getPosition = () => { return $blockpos };
                x.prototype.$getPosition0 = () => { return $blockpos };
                x.prototype.$getPositionVector = () => { return vector };
                x.prototype.$func_145751_f = () => { return 0 };
                x.prototype.$sendCommandFeedback = () => { return feedback ? 1 : 0 }
                var cmd = new x();
                cmd.$setCommand(ModAPI.util.str(commandStr));

                try {
                    cmd.$trigger($world);
                } catch (error) {
                    console.error(error);
                }
            }
        }
        ModAPI.dedicatedServer.appendCode(EFB2__defineExecCmdGlobal);
        EFB2__defineExecCmdGlobal();
    
        function EFB2__defineMessageCommandSender() {
            var chatComponentText = ModAPI.reflect.getClassById("net.minecraft.util.ChatComponentText").constructors[0];
            globalThis.efb2__messageCommandSender = function efb2__messageCommandSender(cmdSender, str) {
                return cmdSender.$addChatMessage(chatComponentText(ModAPI.util.str(str)));
            }
        }
        ModAPI.dedicatedServer.appendCode(EFB2__defineMessageCommandSender);
        EFB2__defineMessageCommandSender();
    
        function EFB2__defineJavaLogger() {
            var logger = ModAPI.reflect.getClassByName("LogManager").staticMethods.getLogger0.method();
            globalThis.efb2__jlog = function efb2__jlog(log) {
                if (typeof log === "string") {
                    logger.$info(ModAPI.util.str(log));
                } else {
                    console.log(log);
                }
            }
            globalThis.efb2__jwarn = function efb2__jwarn(log) {
                logger.$warn(ModAPI.util.str(log));
            }
            globalThis.efb2__jerr = function efb2__jerr(log) {
                logger.$error1(ModAPI.util.str(log));
            }
        }
        ModAPI.dedicatedServer.appendCode(EFB2__defineJavaLogger);
        EFB2__defineJavaLogger();
    

(function MetadataDatablock() {
    ModAPI.meta.title("Bendies RPG MOD");
    ModAPI.meta.version("Indev v0.1");
    ModAPI.meta.description("Use /start to play!");
    ModAPI.meta.credits("By BendieGames");
})();
(function CommandDatablock() {
    PluginAPI.dedicatedServer.appendCode(function () {
        PluginAPI.addEventListener("processcommand", ($$event) => {
            if ($$event.command.toLowerCase().startsWith("/start")) {
                var $$arguments = $$event.command.substring(7).trim().split(" ").filter(x=>!!x);
                var $$isPlayer = ModAPI.reflect.getClassById("net.minecraft.entity.player.EntityPlayerMP").instanceOf($$event.sender.getRef());
                if (
                    $$isPlayer
                ) {
                    (function (__efb2_arg_argument_list,__efb2_arg_player,__efb2_arg_command_sender) {var __efb2_arg_argument_list,__efb2_arg_player,__efb2_arg_command_sender,loaded_,Player,level;function Test_for_RPG_STATS(Player) {
  if (level == 0) {
    efb2__jlog('Thanks for playing this version of BAM Indev!');}
}  if (loaded_ == 'Yes') {
    efb2__messageCommandSender(__efb2_arg_command_sender, 'Welcome to Bendies RPG Indev Eaglerforge Mod!');efb2__messageCommandSender(__efb2_arg_command_sender, 'This is just indev so much is to come in the following updates!');Test_for_RPG_STATS(__efb2_arg_command_sender);
  }
})($$arguments, $$event.sender.getRef(), $$event.sender.getRef());
                }
                $$event.preventDefault = true;
            }
        });
    });
})();(function ItemDatablock() {
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAINJREFUOE9jZKAQMFKonwGnAQJJ0/4jG/5hXhZWtVgF0TXDDMJmCIYBuDTjMgTFAHTNmoamYH3Xz59GCSpkl8ANwKUZphOXIVgNgNmMHkPIhsBcgWEALs3oLsFpAEghWS4AaUQOB3RDsDkfpAdvNGKLBfS0QP2EBAssipIyKRmM4twIAL9wRRE0xJ/sAAAAAElFTkSuQmCC";

    function $$ServersideItem() {
        var $$itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
        var $$itemSuper = ModAPI.reflect.getSuper($$itemClass, (x) => x.length === 1);
        var $$itemUseAnimation = ModAPI.reflect.getClassById("net.minecraft.item.EnumAction").staticVariables["NONE"];
        function $$CustomItem() {
            $$itemSuper(this);
              this.$setCreativeTab(ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.tabMisc);this.$maxStackSize = (1);;
        }
        ModAPI.reflect.prototypeStack($$itemClass, $$CustomItem);
        $$CustomItem.prototype.$onItemRightClick = function ($$itemstack, $$world, $$player) {
            ($$player).$setItemInUse($$itemstack,32);
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$getMaxItemUseDuration = function () {
            return 32;
        }
        $$CustomItem.prototype.$getItemUseAction = function () {
            return $$itemUseAnimation;
        }
        $$CustomItem.prototype.$onItemUseFinish = function (__efb2_arg_itemstack, __efb2_arg_world, __efb2_arg_player) {
            var __efb2_arg_itemstack,__efb2_arg_world,__efb2_arg_player;  efb2__executeCommandAs(__efb2_arg_player, '/give @p written_book 1 0 {pages:["[\\"\\",{\\"text\\":\\"Welcome to Bendies Adventure MOD \\"},{\\"text\\":\\"Indev\\",\\"color\\":\\"dark_red\\"},{\\"text\\":\\"!\\\\nThe mod isnt done yet and just began development so there isnt much. As of this books making all you can do is a few things.\\\\n1. Fight mobs\\\\n2. Pick a class\\\\n3. Buy some items\\\\nBut dont worry! There will be more coming soon! :D\\",\\"color\\":\\"reset\\"}]","[\\"\\",{\\"text\\":\\"Origins\\",\\"bold\\":true,\\"color\\":\\"blue\\"},{\\"text\\":\\"\\\\n\\\\nTo start your \\",\\"color\\":\\"reset\\"},{\\"text\\":\\"adventure\\",\\"hoverEvent\\":{\\"action\\":\\"show_text\\",\\"value\\":\\"The adventure awaits!\\"}},{\\"text\\":\\". You, \\"},{\\"selector\\":\\"@s\\"},{\\"text\\":\\" needs to choose a class :D\\\\n\\\\nHere are your choices\\\\n\\\\n\\"},{\\"text\\":\\"1. Mage (not finished)\\",\\"color\\":\\"dark_blue\\"},{\\"text\\":\\"\\\\n\\",\\"color\\":\\"reset\\"},{\\"text\\":\\"2. Swordsman ( in progress)\\",\\"color\\":\\"dark_red\\",\\"clickEvent\\":{\\"action\\":\\"run_command\\",\\"value\\":\\"/say Selected swordsman!\\"}},{\\"text\\":\\"\\\\n\\",\\"color\\":\\"reset\\"},{\\"text\\":\\"3. Archer (not finished)\\",\\"color\\":\\"dark_green\\"}]"],title:Welcome,author:BendieGames,display:{Lore:[":D"]}}', false);return __efb2_arg_itemstack;;
            return (__efb2_arg_itemstack);
        }
        $$CustomItem.prototype.$onUpdate = function ($$itemstack, $$world, $$player, $$hotbar_slot, $$is_held) {
            $$is_held = ($$is_held) ? true : false;
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$onItemUse0 = function ($$itemstack, $$player, $$world, $$blockpos) {
            ;
            return 0;
        }
        $$CustomItem.prototype.$onCreated = function ($$itemstack, $$world, $$player) {
            ;
        }
        function $$internal_reg() {
            var $$custom_item = (new $$CustomItem()).$setUnlocalizedName(
                ModAPI.util.str("basic_orb")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("basic_orb"), ModAPI.util.str("basic_orb"), $$custom_item);
            ModAPI.items["basic_orb"] = $$custom_item;
            return $$custom_item;
        }
        if (ModAPI.items) {
            return $$internal_reg();
        } else {
            ModAPI.addEventListener("bootstrap", $$internal_reg);
        }
    }

    ModAPI.dedicatedServer.appendCode($$ServersideItem); 
    var $$custom_item = $$ServersideItem();

    ModAPI.addEventListener("lib:asyncsink", async () => {
        ModAPI.addEventListener("lib:asyncsink:registeritems", ($$renderItem)=>{
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("basic_orb"));
        });
        AsyncSink.L10N.set("item.basic_orb.name", "Orb of adventure");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/basic_orb.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/basic_orb"
                },
                "display": {
                    "thirdperson": {
                        "rotation": [ -90, 0, 0 ],
                        "translation": [ 0, 1, -3 ],
                        "scale": [ 0.55, 0.55, 0.55 ]
                    },
                    "firstperson": {
                        "rotation": [ 0, -135, 25 ],
                        "translation": [ 0, 4, 2 ],
                        "scale": [ 1.7, 1.7, 1.7 ]
                    }
                }
            }
        ));
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/basic_orb.png", await (await fetch(
            $$itemTexture
        )).arrayBuffer());
    });
})();
(function CommandDatablock() {
    PluginAPI.dedicatedServer.appendCode(function () {
        PluginAPI.addEventListener("processcommand", ($$event) => {
            if ($$event.command.toLowerCase().startsWith("/load")) {
                var $$arguments = $$event.command.substring(6).trim().split(" ").filter(x=>!!x);
                var $$isPlayer = ModAPI.reflect.getClassById("net.minecraft.entity.player.EntityPlayerMP").instanceOf($$event.sender.getRef());
                if (
                    $$isPlayer
                ) {
                    (function (__efb2_arg_argument_list,__efb2_arg_player,__efb2_arg_command_sender) {var __efb2_arg_argument_list,__efb2_arg_player,__efb2_arg_command_sender,loaded_,Player,level,Player;function Load_stats(Player) {
  level = (Player["$"+experienceLevel]);
}  loaded_ = 'Yes';
  efb2__executeCommandAs(__efb2_arg_command_sender, '/gamerule keepinventory true', false);efb2__executeCommandAs(__efb2_arg_command_sender, '/gamemode adventure', false);Load_stats(__efb2_arg_command_sender);
  efb2__jlog('Loaded the mod!');efb2__messageCommandSender(__efb2_arg_command_sender, 'Commands /Quest_Book   /start   /load');})($$arguments, $$event.sender.getRef(), $$event.sender.getRef());
                }
                $$event.preventDefault = true;
            }
        });
    });
})();
(function CommandDatablock() {
    PluginAPI.dedicatedServer.appendCode(function () {
        PluginAPI.addEventListener("processcommand", ($$event) => {
            if ($$event.command.toLowerCase().startsWith("/Quest_Book")) {
                var $$arguments = $$event.command.substring(12).trim().split(" ").filter(x=>!!x);
                var $$isPlayer = ModAPI.reflect.getClassById("net.minecraft.entity.player.EntityPlayerMP").instanceOf($$event.sender.getRef());
                if (
                    $$isPlayer
                ) {
                    (function (__efb2_arg_argument_list,__efb2_arg_player,__efb2_arg_command_sender) {var __efb2_arg_argument_list,__efb2_arg_player,__efb2_arg_command_sender;  efb2__executeCommand(((__efb2_arg_command_sender).$worldObj), ((__efb2_arg_command_sender)["$getPosition"]()), '/give @p written_book 1 0 {pages:["[\\"\\",{\\"text\\":\\"Quests (level 1 - 10)\\\\n\\\\nKill 5 zombies \\"},{\\"text\\":\\"Start\\",\\"bold\\":true,\\"color\\":\\"dark_green\\",\\"clickEvent\\":{\\"action\\":\\"run_command\\",\\"value\\":\\"/say Coming Soon\\"}},{\\"text\\":\\"\\\\n\\\\n\\\\nThats all for now :D\\",\\"color\\":\\"reset\\"}]"],title:"Quest Book",author:BendieGames}', false);})($$arguments, $$event.sender.getRef(), $$event.sender.getRef());
                }
                $$event.preventDefault = true;
            }
        });
    });
})();
})();
