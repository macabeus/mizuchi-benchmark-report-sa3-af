You are decompiling an assembly function called `aEDZ_actor_init` in MIPS from a Nintendo 64 game.





# Function declaration for the target assembly

`void aEDZ_actor_init(Actor* thisx, Game_Play* game_play);`



# Types definitions used in the declarations

```c
typedef struct Game_Play {
    /* 0x0000 */ Game state;
    /* 0x00E0 */ s16 unk_00E0;
    /* 0x00E2 */ UNK_TYPE1 unk_00E2[0x2];
    /* 0x00E4 */ s8 unk_00E4;
    /* 0x00E5 */ s8 unk_00E5;
    /* 0x00E6 */ UNK_TYPE1 unk_00E6[0x2];
    /* 0x00E8 */ UNK_TYPE1 unk_00E8[0x24];
    /* 0x010C */ void* unk_010C;
    /* 0x0110 */ ObjectExchangeBank objectExchangeBank;
    /* 0x1938 */ View view;
    /* 0x1A60 */ Camera2 camera;
    /* 0x1B98 */ Kankyo kankyo;
    /* 0x1C60 */ Global_light glight;
    /* 0x1C70 */ Pause pause;
    /* 0x1C78 */ ActorInfo actorInfo;
    /* 0x1CBC */ Submenu submenu;
    /* 0x1DAC */ s8 unk_1DAC;
    /* 0x1DAD */ UNK_TYPE1 unk_1DAD[0x3];
    /* 0x1DB0 */ u8* groundTexPtrs[2];
    /* 0x1DB8 */ u8* groundPalPtrs[2];
    /* 0x1DC0 */ PreRender unk_1DC0;
    /* 0x1E10 */ DoorInfo sceneDoorInfo;
    /* 0x1E18 */ s32 unk_1E18;
    /* 0x1E1C */ MtxF viewProjectionMtxF;
    /* 0x1E5C */ MtxF billboardMtxF;
    /* 0x1E9C */ Mtx* unk_1E9C;
    /* 0x1EA0 */ u32 unk_1EA0;
    /* 0x1EA4 */ UNK_TYPE1 unk_1EA4[0x1];
    /* 0x1EA5 */ u8 unk_1EA5;
    /* 0x1EA6 */ u8 unk_1EA6;
    /* 0x1EA7 */ u8 unk_1EA7;
    /* 0x1EA8 */ struct ActorEntry* unk_1EA8;
    /* 0x1EAC */ struct ActorEntry* unk_1EAC;
    /* 0x1EB0 */ s16* unk_1EB0;
    /* 0x1EB4 */ s16* unk_1EB4;
    /* 0x1EB8 */ s32 unk_1EB8;
    /* 0x1EBC */ Event event;
    /* 0x1ECC */ UNK_TYPE1 unk_1ECC[0x14];
    /* 0x1EE0 */ u8 unk_1EE0;
    /* 0x1EE1 */ u8 unk_1EE1;
    /* 0x1EE2 */ u8 unk_1EE2;
    /* 0x1EE3 */ u8 unk_1EE3;
    /* 0x1EE4 */ UNK_TYPE1 unk_1EE4[0x4];
    /* 0x1EE8 */ Game_Play_Unk_1EE8 unk_1EE8;
    /* 0x2128 */ fbDemoFade unk_2128;
    /* 0x2138 */ CollisionCheck unk_2138;
    /* 0x2208 */ Game_Play_unk_2208 unk_2208;
    /* 0x220C */ s32 unk_220C;
    /* 0x2210 */ struct SceneDmaStatus* unk_2210;
    /* 0x2214 */ UNK_TYPE1 unk_2214[0x1FC];
} Game_Play;
```

```c
typedef struct Actor {
    /* 0x000 */ s16 name;   // id
    /* 0x002 */ u8 part;    // category
    /* 0x003 */ u8 unk_003; // If set to 1 then fgdata will be restored independently of the actor's part
    /* 0x004 */ u16 unk_004;
    /* 0x006 */ u16 fgName;
    /* 0x008 */ s8 blockX;
    /* 0x009 */ s8 blockZ;
    /* 0x00A */ s16 unk_00A;
    /* 0x00C */ PosRot home;
    /* 0x020 */ u32 flags;
    /* 0x024 */ s16 params;
    /* 0x026 */ s16 unk_026; // objBankIndex
    /* 0x028 */ PosRot world;
    /* 0x03C */ xyz_t prevPos;
    /* 0x048 */ PosRot eye; // focus
    /* 0x05C */ xyz_t scale;
    /* 0x068 */ xyz_t velocity;
    /* 0x074 */ f32 speed;
    /* 0x078 */ f32 gravity;
    /* 0x07C */ f32 terminalVelocity;
    /* 0x080 */ UNK_TYPE1 unk_080[0x4];
    /* 0x084 */ mCoBG_Check colCheck;
    /* 0x0B4 */ u8 unk_0B4;
    /* 0x0B5 */ u8 isDrawn;
    /* 0x0B6 */ s16 yawTowardsPlayer;
    /* 0x0B8 */ f32 xyzDistToPlayerSq;
    /* 0x0BC */ f32 xzDistToPlayer;
    /* 0x0C0 */ f32 playerHeightRel;
    /* 0x0C4 */ CollisionCheck_Status colStatus; // made-up name
    /* 0x0DC */ Shape_Info shape;
    /* 0x124 */ xyz_t projectedPos;
    /* 0x130 */ f32 projectedW;
    /* 0x134 */ f32 uncullZoneScale;
    /* 0x138 */ f32 uncullZoneDownward;
    /* 0x13C */ f32 unk_13C;
    /* 0x140 */ f32 unk_140;
    /* 0x144 */ f32 unk_144;
    /* 0x148 */ u8 unk_148;
    /* 0x149 */ u8 unk_149;
    /* 0x14A */ UNK_TYPE1 unk_14A[0x2];
    /* 0x14C */ struct Actor* parent;
    /* 0x150 */ struct Actor* child;
    /* 0x154 */ struct Actor* prev;
    /* 0x158 */ struct Actor* next;
    /* 0x15C */ ActorFunc ct;
    /* 0x160 */ ActorFunc dt;
    /* 0x164 */ ActorFunc update;
    /* 0x168 */ ActorFunc draw;
    /* 0x16C */ ActorFunc save;
    /* 0x170 */ struct ActorOverlay* overlayEntry;
} Actor;
```

# Primary Objective

Decompile the following target assembly function from `asm/jp/nonmatchings/overlays/actors/ovl_Ev_Dozaemon/ac_ev_dozaemon/aEDZ_actor_init.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel aEDZ_actor_init
nonmatching aEDZ_actor_init, 0x2C
    /* 9583F0 80A98180 27BDFFE8 */  addiu       $sp, $sp, -0x18
    /* 9583F4 80A98184 AFBF0014 */  sw          $ra, 0x14($sp)
    /* 9583F8 80A98188 3C0E8013 */  lui         $t6, %hi(common_data + 0x1004C)
    /* 9583FC 80A9818C 8DCE6EEC */  lw          $t6, %lo(common_data + 0x1004C)($t6)
    /* 958400 80A98190 8DD900CC */  lw          $t9, 0xCC($t6)
    /* 958404 80A98194 0320F809 */  jalr        $t9
    /* 958408 80A98198 00000000 */   nop
    /* 95840C 80A9819C 8FBF0014 */  lw          $ra, 0x14($sp)
    /* 958410 80A981A0 27BD0018 */  addiu       $sp, $sp, 0x18
    /* 958414 80A981A4 03E00008 */  jr          $ra
    /* 958418 80A981A8 00000000 */   nop
endlabel aEDZ_actor_init
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
