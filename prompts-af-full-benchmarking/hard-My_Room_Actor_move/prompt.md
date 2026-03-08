You are decompiling an assembly function called `My_Room_Actor_move` in MIPS from a Nintendo 64 game.

# Examples

## `trademark_move`

```c
void trademark_move(Game_Trademark* this) {
    if (this->curState == TRADEMARK_STATE_0) {
        if (DECR(this->unk_25A68) == 0) {
            mBGMPsComp_make_ps_lost_fanfare(s_titlebgm[mTD_get_titledemo_no()], 0x168);
            sAdo_SysTrgStart(0x105);
            this->fadeColor = 0;
            this->curState = TRADEMARK_STATE_1;
        }
    }

    if (func_80804C40_jp() && ((this->curState == TRADEMARK_STATE_3) || this->unk_25A70)) {
        if (this->fadeColor < 255) {
            this->fadeColor += 8;
        }

        if (this->unk_25A71 != 1) {
            if (func_8008F768_jp(&B_80808560_jp, &B_80818560_jp) == 1) {
                this->unk_25A71 = 1;
            }
        }

        if ((this->fadeColor >= 255) && (this->unk_25A71 == 1)) {
            this->fadeColor = 255;
            this->curState = TRADEMARK_STATE_5;
        }
    }
}
```

```asm
         addiu sp, sp, -0x20
         sw ra, 0x14(sp)
         or a3, a0, zero
         lui at, 0x2
         addu a2, a3, at
         lbu t6, 0x5a6e(a2)
         bnezl t6, .L9c39
         sw a2, 0x18(sp)
         lh v0, 0x5a68(a2)
         lui at, 0x2
         addu at, at, a3
         bnez v0, .L3c15
         addiu t7, v0, -0x1
         b .L4417
         or v1, zero, zero
     11sh t7, 0x5a68(at)
         lh v1, 0x5a68(a2)
     13bnezl v1, .L9c39
         sw a2, 0x18(sp)
         sw a2, 0x18(sp)
         jal mTD_get_titledemo_no
         sw a3, 0x20(sp)
         lui a0, %hi(s_titlebgm)
         addu a0, a0, v0
         lbu a0, %lo(s_titlebgm)(a0)
         jal mBGMPsComp_make_ps_lost_fanfare
         addiu a1, zero, 0x168
         jal sAdo_SysTrgStart
         addiu a0, zero, 0x105
         lw a3, 0x20(sp)
         lui at, 0x2
         lw a2, 0x18(sp)
         addu at, at, a3
         sw zero, 0x5a60(at)
         lui at, 0x2
         addiu t8, zero, 0x1
         addu at, at, a3
         sb t8, 0x5a6e(at)
         sw a2, 0x18(sp)
     6jal func_80804C40_jp
         sw a3, 0x20(sp)
         lw a2, 0x18(sp)
         beqz v0, .L16890
         lw a3, 0x20(sp)
         lbu t9, 0x5a6e(a2)
         addiu at, zero, 0x3
         beql t9, at, .Ld052
         lw v0, 0x5a60(a2)
         lbu t0, 0x5a70(a2)
         beqzl t0, .L16c91
         lw ra, 0x14(sp)
         lw v0, 0x5a60(a2)
     46lui a0, %hi(B_80808560_jp)
         addiu a0, a0, %lo(B_80808560_jp)
         sltiu at, v0, 0xff
         beqz at, .Lf060
         addiu t1, v0, 0x8
         lui at, 0x2
         addu at, at, a3
         sw t1, 0x5a60(at)
     55lbu t2, 0x5a71(a2)
         addiu v1, zero, 0x1
         lui a1, %hi(B_80818560_jp)
         beq v1, t2, .L13076
         addiu a1, a1, %lo(B_80818560_jp)
         sw a2, 0x18(sp)
         jal func_8008F768_jp
         sw a3, 0x20(sp)
         addiu v1, zero, 0x1
         lw a2, 0x18(sp)
         bne v0, v1, .L13076
         lw a3, 0x20(sp)
         lui at, 0x2
         addu at, at, a3
         addiu t3, zero, 0x1
         sb t3, 0x5a71(at)
     63lw t4, 0x5a60(a2)
         sltiu at, t4, 0xff
         bnezl at, .L16c91
         lw ra, 0x14(sp)
         lbu t5, 0x5a71(a2)
         lui at, 0x2
         addu at, at, a3
         bne v1, t5, .L16890
         addiu t6, zero, 0xff
         sw t6, 0x5a60(at)
         lui at, 0x2
         addu at, at, a3
         addiu t7, zero, 0x5
         sb t7, 0x5a6e(at)
     42lw ra, 0x14(sp)
     49addiu sp, sp, 0x20
         jr ra
         nop 
```



# Function declaration for the target assembly

`void My_Room_Actor_move(Actor* thisx, Game_Play* game_play);`

# Declarations for the functions called from the target assembly

- `MessageWindow* mMsg_Get_base_window_p(void);`
- `void mBGMPsComp_MDPlayerPos_param_set(xyz_t* pos, u16 angle, u16 mdType, u32 ongenNum);`
- `u16 mFI_GetFieldId(void);`
- `s32 mFI_CheckShop(void);`

# Types definitions used in the declarations

```c
typedef struct MessageWindow {
    /* 0x000 */ UNK_TYPE1 unk_000[0x1B0];
    /* 0x1B0 */ Choice choiceWindow;
} MessageWindow;
```

```c
typedef struct xyz_t {
    /* 0x0 */ f32 x;
    /* 0x4 */ f32 y;
    /* 0x8 */ f32 z;
} xyz_t;
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

# Primary Objective

Decompile the following target assembly function from `asm/jp/nonmatchings/overlays/actors/ovl_My_Room/ac_my_room/My_Room_Actor_move.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel My_Room_Actor_move
nonmatching My_Room_Actor_move, 0x200
    /* 83C6BC 809455DC 27BDFFD8 */  addiu       $sp, $sp, -0x28
    /* 83C6C0 809455E0 AFB00018 */  sw          $s0, 0x18($sp)
    /* 83C6C4 809455E4 00808025 */  or          $s0, $a0, $zero
    /* 83C6C8 809455E8 AFBF001C */  sw          $ra, 0x1C($sp)
    /* 83C6CC 809455EC AFA5002C */  sw          $a1, 0x2C($sp)
    /* 83C6D0 809455F0 3C0E8013 */  lui         $t6, %hi(common_data + 0x10003)
    /* 83C6D4 809455F4 91CE6EA3 */  lbu         $t6, %lo(common_data + 0x10003)($t6)
    /* 83C6D8 809455F8 3C018000 */  lui         $at, (0x80000000 >> 16)
    /* 83C6DC 809455FC 02002025 */  or          $a0, $s0, $zero
    /* 83C6E0 80945600 AFAE0020 */  sw          $t6, 0x20($sp)
    /* 83C6E4 80945604 8E0F01D4 */  lw          $t7, 0x1D4($s0)
    /* 83C6E8 80945608 8FA5002C */  lw          $a1, 0x2C($sp)
    /* 83C6EC 8094560C 01E1C021 */  addu        $t8, $t7, $at
    /* 83C6F0 80945610 3C018014 */  lui         $at, %hi(SegmentBaseAddress + 0x18)
    /* 83C6F4 80945614 AC3858B8 */  sw          $t8, %lo(SegmentBaseAddress + 0x18)($at)
    /* 83C6F8 80945618 8E19049C */  lw          $t9, 0x49C($s0)
    /* 83C6FC 8094561C 0320F809 */  jalr        $t9
    /* 83C700 80945620 00000000 */   nop
    /* 83C704 80945624 86080174 */  lh          $t0, 0x174($s0)
    /* 83C708 80945628 15000003 */  bnez        $t0, .L80945638
    /* 83C70C 8094562C 02002025 */   or         $a0, $s0, $zero
    /* 83C710 80945630 0C24EBE9 */  jal         func_8093AFA4_jp
    /* 83C714 80945634 8FA5002C */   lw         $a1, 0x2C($sp)
  .L80945638:
    /* 83C718 80945638 0C021F85 */  jal         mFI_CheckShop
    /* 83C71C 8094563C 00000000 */   nop
    /* 83C720 80945640 24010001 */  addiu       $at, $zero, 0x1
    /* 83C724 80945644 50410011 */  beql        $v0, $at, .L8094568C
    /* 83C728 80945648 02002025 */   or         $a0, $s0, $zero
    /* 83C72C 8094564C 0C021F22 */  jal         mFI_GetFieldId
    /* 83C730 80945650 00000000 */   nop
    /* 83C734 80945654 24013002 */  addiu       $at, $zero, 0x3002
    /* 83C738 80945658 5041000C */  beql        $v0, $at, .L8094568C
    /* 83C73C 8094565C 02002025 */   or         $a0, $s0, $zero
    /* 83C740 80945660 8E090470 */  lw          $t1, 0x470($s0)
    /* 83C744 80945664 51200009 */  beql        $t1, $zero, .L8094568C
    /* 83C748 80945668 02002025 */   or         $a0, $s0, $zero
    /* 83C74C 8094566C 8E02046C */  lw          $v0, 0x46C($s0)
    /* 83C750 80945670 10400005 */  beqz        $v0, .L80945688
    /* 83C754 80945674 00403825 */   or         $a3, $v0, $zero
    /* 83C758 80945678 94450124 */  lhu         $a1, 0x124($v0)
    /* 83C75C 8094567C 24440008 */  addiu       $a0, $v0, 0x8
    /* 83C760 80945680 0C017A93 */  jal         mBGMPsComp_MDPlayerPos_param_set
    /* 83C764 80945684 94460000 */   lhu        $a2, 0x0($v0)
  .L80945688:
    /* 83C768 80945688 02002025 */  or          $a0, $s0, $zero
  .L8094568C:
    /* 83C76C 8094568C 0C251421 */  jal         func_80945084_jp
    /* 83C770 80945690 8FA5002C */   lw         $a1, 0x2C($sp)
    /* 83C774 80945694 86020466 */  lh          $v0, 0x466($s0)
    /* 83C778 80945698 18400003 */  blez        $v0, .L809456A8
    /* 83C77C 8094569C 244AFFFF */   addiu      $t2, $v0, -0x1
    /* 83C780 809456A0 10000002 */  b           .L809456AC
    /* 83C784 809456A4 A60A0466 */   sh         $t2, 0x466($s0)
  .L809456A8:
    /* 83C788 809456A8 A6000466 */  sh          $zero, 0x466($s0)
  .L809456AC:
    /* 83C78C 809456AC 0C021F85 */  jal         mFI_CheckShop
    /* 83C790 809456B0 00000000 */   nop
    /* 83C794 809456B4 24010001 */  addiu       $at, $zero, 0x1
    /* 83C798 809456B8 50410016 */  beql        $v0, $at, .L80945714
    /* 83C79C 809456BC 02002025 */   or         $a0, $s0, $zero
    /* 83C7A0 809456C0 0C021F22 */  jal         mFI_GetFieldId
    /* 83C7A4 809456C4 00000000 */   nop
    /* 83C7A8 809456C8 24013002 */  addiu       $at, $zero, 0x3002
    /* 83C7AC 809456CC 50410011 */  beql        $v0, $at, .L80945714
    /* 83C7B0 809456D0 02002025 */   or         $a0, $s0, $zero
    /* 83C7B4 809456D4 860B0466 */  lh          $t3, 0x466($s0)
    /* 83C7B8 809456D8 5560000E */  bnel        $t3, $zero, .L80945714
    /* 83C7BC 809456DC 02002025 */   or         $a0, $s0, $zero
    /* 83C7C0 809456E0 820C0464 */  lb          $t4, 0x464($s0)
    /* 83C7C4 809456E4 24010001 */  addiu       $at, $zero, 0x1
    /* 83C7C8 809456E8 5581000A */  bnel        $t4, $at, .L80945714
    /* 83C7CC 809456EC 02002025 */   or         $a0, $s0, $zero
    /* 83C7D0 809456F0 0C02747C */  jal         mMsg_Get_base_window_p
    /* 83C7D4 809456F4 00000000 */   nop
    /* 83C7D8 809456F8 0C027A5C */  jal         func_8009E970_jp
    /* 83C7DC 809456FC 00402025 */   or         $a0, $v0, $zero
    /* 83C7E0 80945700 10400003 */  beqz        $v0, .L80945710
    /* 83C7E4 80945704 02002025 */   or         $a0, $s0, $zero
    /* 83C7E8 80945708 0C24E0FB */  jal         func_809383EC_jp
    /* 83C7EC 8094570C 8E050468 */   lw         $a1, 0x468($s0)
  .L80945710:
    /* 83C7F0 80945710 02002025 */  or          $a0, $s0, $zero
  .L80945714:
    /* 83C7F4 80945714 0C25155E */  jal         func_80945578_jp
    /* 83C7F8 80945718 8FA5002C */   lw         $a1, 0x2C($sp)
    /* 83C7FC 8094571C 3C0D8095 */  lui         $t5, %hi(D_8094C034_jp)
    /* 83C800 80945720 25ADC034 */  addiu       $t5, $t5, %lo(D_8094C034_jp)
    /* 83C804 80945724 25B90024 */  addiu       $t9, $t5, 0x24
    /* 83C808 80945728 0200C025 */  or          $t8, $s0, $zero
  .L8094572C:
    /* 83C80C 8094572C 8DAF0000 */  lw          $t7, 0x0($t5)
    /* 83C810 80945730 25AD000C */  addiu       $t5, $t5, 0xC
    /* 83C814 80945734 2718000C */  addiu       $t8, $t8, 0xC
    /* 83C818 80945738 AF0F016C */  sw          $t7, 0x16C($t8)
    /* 83C81C 8094573C 8DAEFFF8 */  lw          $t6, -0x8($t5)
    /* 83C820 80945740 AF0E0170 */  sw          $t6, 0x170($t8)
    /* 83C824 80945744 8DAFFFFC */  lw          $t7, -0x4($t5)
    /* 83C828 80945748 15B9FFF8 */  bne         $t5, $t9, .L8094572C
    /* 83C82C 8094574C AF0F0174 */   sw         $t7, 0x174($t8)
    /* 83C830 80945750 8DAF0000 */  lw          $t7, 0x0($t5)
    /* 83C834 80945754 AF0F0178 */  sw          $t7, 0x178($t8)
    /* 83C838 80945758 8DAE0004 */  lw          $t6, 0x4($t5)
    /* 83C83C 8094575C 0C250EBE */  jal         func_80943AF8_jp
    /* 83C840 80945760 AF0E017C */   sw         $t6, 0x17C($t8)
    /* 83C844 80945764 0C250976 */  jal         func_809425D8_jp
    /* 83C848 80945768 8FA4002C */   lw         $a0, 0x2C($sp)
    /* 83C84C 8094576C 02002025 */  or          $a0, $s0, $zero
    /* 83C850 80945770 0C2507E8 */  jal         func_80941FA0_jp
    /* 83C854 80945774 8FA5002C */   lw         $a1, 0x2C($sp)
    /* 83C858 80945778 0C24E9FD */  jal         func_8093A7F4_jp
    /* 83C85C 8094577C 8FA40020 */   lw         $a0, 0x20($sp)
    /* 83C860 80945780 10400007 */  beqz        $v0, .L809457A0
    /* 83C864 80945784 8FA40020 */   lw         $a0, 0x20($sp)
    /* 83C868 80945788 8FA40020 */  lw          $a0, 0x20($sp)
    /* 83C86C 8094578C 02002825 */  or          $a1, $s0, $zero
    /* 83C870 80945790 0C25153C */  jal         func_809454F0_jp
    /* 83C874 80945794 8FA6002C */   lw         $a2, 0x2C($sp)
    /* 83C878 80945798 10000004 */  b           .L809457AC
    /* 83C87C 8094579C 00000000 */   nop
  .L809457A0:
    /* 83C880 809457A0 02002825 */  or          $a1, $s0, $zero
    /* 83C884 809457A4 0C25154D */  jal         func_80945534_jp
    /* 83C888 809457A8 8FA6002C */   lw         $a2, 0x2C($sp)
  .L809457AC:
    /* 83C88C 809457AC 0C2514CC */  jal         func_80945330_jp
    /* 83C890 809457B0 02002025 */   or         $a0, $s0, $zero
    /* 83C894 809457B4 02002025 */  or          $a0, $s0, $zero
    /* 83C898 809457B8 0C24E8D9 */  jal         func_8093A364_jp
    /* 83C89C 809457BC 8FA5002C */   lw         $a1, 0x2C($sp)
    /* 83C8A0 809457C0 0C25140A */  jal         func_80945028_jp
    /* 83C8A4 809457C4 00000000 */   nop
    /* 83C8A8 809457C8 8FBF001C */  lw          $ra, 0x1C($sp)
    /* 83C8AC 809457CC 8FB00018 */  lw          $s0, 0x18($sp)
    /* 83C8B0 809457D0 27BD0028 */  addiu       $sp, $sp, 0x28
    /* 83C8B4 809457D4 03E00008 */  jr          $ra
    /* 83C8B8 809457D8 00000000 */   nop
endlabel My_Room_Actor_move
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
