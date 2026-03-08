You are decompiling an assembly function called `func_80A0A928_jp` in MIPS from a Nintendo 64 game.







# Declarations for the functions called from the target assembly

- `void mIN_copy_name_str(char*, u16);`
- `MessageWindow* mMsg_Get_base_window_p(void);`
- `void mMsg_Set_free_str(UNK_PTR arg0, s32 arg1, UNK_PTR arg2, s32 arg3);`
- `void mSM_open_submenu(Submenu* submenu, SubmenuProgramId programId, s32 arg2, s32 arg3);`
- `void mPr_SetPossessionItem(PrivateInfo* priv, s32 idx, u16 item, u32 cond);`

# Types definitions used in the declarations

```c
typedef struct MessageWindow {
    /* 0x000 */ UNK_TYPE1 unk_000[0x1B0];
    /* 0x1B0 */ Choice choiceWindow;
} MessageWindow;
```

```c
typedef enum SubmenuProgramId {
    /*  0 */ SUBMENU_PROGRAM_0, // inventory, NONE? DEFAULT?
    /*  1 */ SUBMENU_PROGRAM_1, // inventory
    /*  2 */ SUBMENU_PROGRAM_2,
    /*  3 */ SUBMENU_PROGRAM_3,
    /*  4 */ SUBMENU_PROGRAM_LEDIT,
    /*  5 */ SUBMENU_PROGRAM_MAP,
    /*  6 */ SUBMENU_PROGRAM_6,
    /*  7 */ SUBMENU_PROGRAM_7,
    /*  8 */ SUBMENU_PROGRAM_8,
    /*  9 */ SUBMENU_PROGRAM_9,
    /* 10 */ SUBMENU_PROGRAM_10,
    /* 11 */ SUBMENU_PROGRAM_11,
    /* 12 */ SUBMENU_PROGRAM_BOARD,
    /* 13 */ SUBMENU_PROGRAM_13,
    /* 14 */ SUBMENU_PROGRAM_14,
    /* 15 */ SUBMENU_PROGRAM_15,
    /* 16 */ SUBMENU_PROGRAM_16,
    /* 17 */ SUBMENU_PROGRAM_17,
    /* 18 */ SUBMENU_PROGRAM_18,
    /* 19 */ SUBMENU_PROGRAM_19,
    /* 20 */ SUBMENU_PROGRAM_CATALOG,
    /* 21 */ SUBMENU_PROGRAM_MAX
} SubmenuProgramId;
```

```c
typedef struct Submenu {
    /* 0x00 */ s32 unk_00;
    /* 0x04 */ SubmenuProgramId programId;
    /* 0x08 */ SubmenuProgramId unk_08;
    /* 0x0C */ mSMMoveProcIndex moveProcIndex;
    /* 0x10 */ s32 unk_10;
    /* 0x14 */ s32 unk_14;
    /* 0x18 */ s32 unk_18;
    /* 0x1C */ s32 unk_1C;
    /* 0x20 */ s32 unk_20;
    /* 0x24 */ void* linkedAllocStart;
    /* 0x28 */ void* linkedAllocEnd;
    /* 0x2C */ struct struct_8085E9B0* unk_2C;
    /* 0x30 */ SubmenuMoveFunc move;
    /* 0x34 */ SubmenuDrawFunc draw;
    /* 0x38 */ Mail_c mail;
    /* 0xDC */ u8 unk_DC;
    /* 0xDD */ u8 unk_DD;
    /* 0xDE */ u8 unk_DE;
    /* 0xDF */ u8 unk_DF;
    /* 0xE0 */ u16 unk_E0;
    /* 0xE2 */ u8 unk_E2;
    /* 0xE3 */ u8 unk_E3;
    /* 0xE4 */ xyz_t unk_E4;
} Submenu;
```

```c
typedef struct PrivateInfo {
    /* 0x000 */ PersonalID_c playerId; 
    /* 0x010 */ s8 gender;
    /* 0x011 */ s8 face;
    /* 0x012 */ s8 resetCount; 
    /* 0x013 */ MuseumRecord museumRecord;
    /* 0x014 */ PrivateInventory inventory;
    /* 0x040 */ mQst_delivery_c deliveries[mPr_DELIVERY_QUEST_NUM]; /* delivery quests */
    /* 0x25C */ QuestErrand errands[mPr_ERRAND_QUEST_NUM]; /* errand quests */
    /* 0x3EC */ UNK_TYPE1 unk_3EC[0x2];
    /* 0x3EE */ MailHeaderCommon savedMailHeader;
    /* 0x40A */ Mail_c mail[mPr_INVENTORY_MAIL_COUNT];
    /* 0xA72 */ u16 backgroundTextureId;
    /* 0xA74 */ u8 exists;
    /* 0xA75 */ u8 hintCount;
    /* 0xA76 */ PrivateCloth cloth;
    /* 0xA7A */ AnmPersonalID_c storedAnmId;
    /* 0xA86 */ PrivateDestiny destiny;
    /* 0xA90 */ PrivateBirthday birthday;
    /* 0xA94 */ UNK_TYPE1 unk_A94[0x28];
    /* 0xABC */ s32 completedFish;
    /* 0xAC0 */ s32 completedInsect;
    /* 0xAC4 */ UNK_TYPE1 unk_AC4[0x8];
    /* 0xACC */ Anmremail remail;
    /* 0xADE */ UNK_TYPE1 unk_ADE[0x6];
    /* 0xAE4 */ PrivateAnimalMemory animalMemory;
    /* 0xAEC */ u8 completeFishInsectFlags;
    /* 0xAEF */ UNK_TYPE1 unk_AEF[0x2];
    /* 0x108 */ u32 catalogFurniture[30];
    /* 0x1B4 */ u32 catalogWallpaper[2];
    /* 0x1C0 */ u32 catalogCarpet[2];
    /* 0x1CC */ u32 catalogPaper[2];
    /* 0x1D4 */ u32 catalogMusic[2];
    /* 0xB88 */ mPr_map_info_c maps[mPr_FOREIGN_MAP_COUNT];
    /* 0xBC8 */ UNK_TYPE1 unk_BC8[0x8];
} PrivateInfo;
```

```c
typedef UNK_PTR (*Clip_unk_040_unk_0C)(size_t, const u8*, s32);
```

# Primary Objective

Decompile the following target assembly function from `asm/jp/nonmatchings/overlays/actors/ovl_Shrine/ac_shrine/func_80A0A928_jp.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel func_80A0A928_jp
nonmatching func_80A0A928_jp, 0x1E0
    /* 8D95F8 80A0A928 27BDFFC8 */  addiu       $sp, $sp, -0x38
    /* 8D95FC 80A0A92C AFBF0014 */  sw          $ra, 0x14($sp)
    /* 8D9600 80A0A930 AFA40038 */  sw          $a0, 0x38($sp)
    /* 8D9604 80A0A934 AFA5003C */  sw          $a1, 0x3C($sp)
    /* 8D9608 80A0A938 0C02747C */  jal         mMsg_Get_base_window_p
    /* 8D960C 80A0A93C 00000000 */   nop
    /* 8D9610 80A0A940 8FAF0038 */  lw          $t7, 0x38($sp)
    /* 8D9614 80A0A944 240EFFFF */  addiu       $t6, $zero, -0x1
    /* 8D9618 80A0A948 AFA20034 */  sw          $v0, 0x34($sp)
    /* 8D961C 80A0A94C AFAE002C */  sw          $t6, 0x2C($sp)
    /* 8D9620 80A0A950 8DE302B8 */  lw          $v1, 0x2B8($t7)
    /* 8D9624 80A0A954 24010001 */  addiu       $at, $zero, 0x1
    /* 8D9628 80A0A958 10600007 */  beqz        $v1, .L80A0A978
    /* 8D962C 80A0A95C 00000000 */   nop
    /* 8D9630 80A0A960 10610010 */  beq         $v1, $at, .L80A0A9A4
    /* 8D9634 80A0A964 24010002 */   addiu      $at, $zero, 0x2
    /* 8D9638 80A0A968 1061001C */  beq         $v1, $at, .L80A0A9DC
    /* 8D963C 80A0A96C 8FA2003C */   lw         $v0, 0x3C($sp)
    /* 8D9640 80A0A970 10000062 */  b           .L80A0AAFC
    /* 8D9644 80A0A974 8FBF0014 */   lw         $ra, 0x14($sp)
  .L80A0A978:
    /* 8D9648 80A0A978 0C027A42 */  jal         func_8009E908_jp
    /* 8D964C 80A0A97C 8FA40034 */   lw         $a0, 0x34($sp)
    /* 8D9650 80A0A980 24010001 */  addiu       $at, $zero, 0x1
    /* 8D9654 80A0A984 5441005D */  bnel        $v0, $at, .L80A0AAFC
    /* 8D9658 80A0A988 8FBF0014 */   lw         $ra, 0x14($sp)
    /* 8D965C 80A0A98C 0C02753C */  jal         func_8009D4F0_jp
    /* 8D9660 80A0A990 8FA40034 */   lw         $a0, 0x34($sp)
    /* 8D9664 80A0A994 8FB90038 */  lw          $t9, 0x38($sp)
    /* 8D9668 80A0A998 24180001 */  addiu       $t8, $zero, 0x1
    /* 8D966C 80A0A99C 10000056 */  b           .L80A0AAF8
    /* 8D9670 80A0A9A0 AF3802B8 */   sw         $t8, 0x2B8($t9)
  .L80A0A9A4:
    /* 8D9674 80A0A9A4 0C02749D */  jal         func_8009D274_jp
    /* 8D9678 80A0A9A8 8FA40034 */   lw         $a0, 0x34($sp)
    /* 8D967C 80A0A9AC 24010001 */  addiu       $at, $zero, 0x1
    /* 8D9680 80A0A9B0 14410051 */  bne         $v0, $at, .L80A0AAF8
    /* 8D9684 80A0A9B4 8FA4003C */   lw         $a0, 0x3C($sp)
    /* 8D9688 80A0A9B8 24841CBC */  addiu       $a0, $a0, 0x1CBC
    /* 8D968C 80A0A9BC 24050001 */  addiu       $a1, $zero, 0x1
    /* 8D9690 80A0A9C0 2406000B */  addiu       $a2, $zero, 0xB
    /* 8D9694 80A0A9C4 0C031363 */  jal         mSM_open_submenu
    /* 8D9698 80A0A9C8 00003825 */   or         $a3, $zero, $zero
    /* 8D969C 80A0A9CC 8FA90038 */  lw          $t1, 0x38($sp)
    /* 8D96A0 80A0A9D0 24080002 */  addiu       $t0, $zero, 0x2
    /* 8D96A4 80A0A9D4 10000048 */  b           .L80A0AAF8
    /* 8D96A8 80A0A9D8 AD2802B8 */   sw         $t0, 0x2B8($t1)
  .L80A0A9DC:
    /* 8D96AC 80A0A9DC 904A1D98 */  lbu         $t2, 0x1D98($v0)
    /* 8D96B0 80A0A9E0 24421CBC */  addiu       $v0, $v0, 0x1CBC
    /* 8D96B4 80A0A9E4 55400045 */  bnel        $t2, $zero, .L80A0AAFC
    /* 8D96B8 80A0A9E8 8FBF0014 */   lw         $ra, 0x14($sp)
    /* 8D96BC 80A0A9EC 944B00E0 */  lhu         $t3, 0xE0($v0)
    /* 8D96C0 80A0A9F0 00002825 */  or          $a1, $zero, $zero
    /* 8D96C4 80A0A9F4 55600006 */  bnel        $t3, $zero, .L80A0AA10
    /* 8D96C8 80A0A9F8 904400DF */   lbu        $a0, 0xDF($v0)
    /* 8D96CC 80A0A9FC 0C0274ED */  jal         func_8009D3B4_jp
    /* 8D96D0 80A0AA00 00000000 */   nop
    /* 8D96D4 80A0AA04 1000002D */  b           .L80A0AABC
    /* 8D96D8 80A0AA08 8FAB002C */   lw         $t3, 0x2C($sp)
    /* 8D96DC 80A0AA0C 904400DF */  lbu         $a0, 0xDF($v0)
  .L80A0AA10:
    /* 8D96E0 80A0AA10 0C02ECE9 */  jal         func_800BB3A4_jp
    /* 8D96E4 80A0AA14 AFA20018 */   sw         $v0, 0x18($sp)
    /* 8D96E8 80A0AA18 10400004 */  beqz        $v0, .L80A0AA2C
    /* 8D96EC 80A0AA1C 8FAD0018 */   lw         $t5, 0x18($sp)
    /* 8D96F0 80A0AA20 240C1129 */  addiu       $t4, $zero, 0x1129
    /* 8D96F4 80A0AA24 10000024 */  b           .L80A0AAB8
    /* 8D96F8 80A0AA28 AFAC002C */   sw         $t4, 0x2C($sp)
  .L80A0AA2C:
    /* 8D96FC 80A0AA2C 91A400DF */  lbu         $a0, 0xDF($t5)
    /* 8D9700 80A0AA30 0C02ECE9 */  jal         func_800BB3A4_jp
    /* 8D9704 80A0AA34 24050001 */   addiu      $a1, $zero, 0x1
    /* 8D9708 80A0AA38 10400004 */  beqz        $v0, .L80A0AA4C
    /* 8D970C 80A0AA3C 8FAF0018 */   lw         $t7, 0x18($sp)
    /* 8D9710 80A0AA40 240E112A */  addiu       $t6, $zero, 0x112A
    /* 8D9714 80A0AA44 1000001C */  b           .L80A0AAB8
    /* 8D9718 80A0AA48 AFAE002C */   sw         $t6, 0x2C($sp)
  .L80A0AA4C:
    /* 8D971C 80A0AA4C 0C02EF40 */  jal         func_800BBD00_jp
    /* 8D9720 80A0AA50 91E400DF */   lbu        $a0, 0xDF($t7)
    /* 8D9724 80A0AA54 10400004 */  beqz        $v0, .L80A0AA68
    /* 8D9728 80A0AA58 8FB90018 */   lw         $t9, 0x18($sp)
    /* 8D972C 80A0AA5C 2418112A */  addiu       $t8, $zero, 0x112A
    /* 8D9730 80A0AA60 10000015 */  b           .L80A0AAB8
    /* 8D9734 80A0AA64 AFB8002C */   sw         $t8, 0x2C($sp)
  .L80A0AA68:
    /* 8D9738 80A0AA68 27A40020 */  addiu       $a0, $sp, 0x20
    /* 8D973C 80A0AA6C 0C0259D0 */  jal         mIN_copy_name_str
    /* 8D9740 80A0AA70 972500E0 */   lhu        $a1, 0xE0($t9)
    /* 8D9744 80A0AA74 8FA40034 */  lw          $a0, 0x34($sp)
    /* 8D9748 80A0AA78 00002825 */  or          $a1, $zero, $zero
    /* 8D974C 80A0AA7C 27A60020 */  addiu       $a2, $sp, 0x20
    /* 8D9750 80A0AA80 0C0275B4 */  jal         mMsg_Set_free_str
    /* 8D9754 80A0AA84 2407000A */   addiu      $a3, $zero, 0xA
    /* 8D9758 80A0AA88 8FA90018 */  lw          $t1, 0x18($sp)
    /* 8D975C 80A0AA8C 2408112B */  addiu       $t0, $zero, 0x112B
    /* 8D9760 80A0AA90 AFA8002C */  sw          $t0, 0x2C($sp)
    /* 8D9764 80A0AA94 0C02EB6F */  jal         func_800BADBC_jp
    /* 8D9768 80A0AA98 912400DF */   lbu        $a0, 0xDF($t1)
    /* 8D976C 80A0AA9C 8FAA0018 */  lw          $t2, 0x18($sp)
    /* 8D9770 80A0AAA0 3C048013 */  lui         $a0, %hi(common_data + 0x10138)
    /* 8D9774 80A0AAA4 8C846FD8 */  lw          $a0, %lo(common_data + 0x10138)($a0)
    /* 8D9778 80A0AAA8 00003025 */  or          $a2, $zero, $zero
    /* 8D977C 80A0AAAC 00003825 */  or          $a3, $zero, $zero
    /* 8D9780 80A0AAB0 0C02E2C2 */  jal         mPr_SetPossessionItem
    /* 8D9784 80A0AAB4 914500DF */   lbu        $a1, 0xDF($t2)
  .L80A0AAB8:
    /* 8D9788 80A0AAB8 8FAB002C */  lw          $t3, 0x2C($sp)
  .L80A0AABC:
    /* 8D978C 80A0AABC 2401FFFF */  addiu       $at, $zero, -0x1
    /* 8D9790 80A0AAC0 51610009 */  beql        $t3, $at, .L80A0AAE8
    /* 8D9794 80A0AAC4 8FA40038 */   lw         $a0, 0x38($sp)
    /* 8D9798 80A0AAC8 0C027A70 */  jal         func_8009E9C0_jp
    /* 8D979C 80A0AACC 8FA40034 */   lw         $a0, 0x34($sp)
    /* 8D97A0 80A0AAD0 0C027588 */  jal         func_8009D620_jp
    /* 8D97A4 80A0AAD4 8FA40034 */   lw         $a0, 0x34($sp)
    /* 8D97A8 80A0AAD8 8FA40034 */  lw          $a0, 0x34($sp)
    /* 8D97AC 80A0AADC 0C0276E9 */  jal         func_8009DBA4_jp
    /* 8D97B0 80A0AAE0 8FA5002C */   lw         $a1, 0x2C($sp)
    /* 8D97B4 80A0AAE4 8FA40038 */  lw          $a0, 0x38($sp)
  .L80A0AAE8:
    /* 8D97B8 80A0AAE8 0C282AD1 */  jal         func_80A0AB44_jp
    /* 8D97BC 80A0AAEC 24050003 */   addiu      $a1, $zero, 0x3
    /* 8D97C0 80A0AAF0 8FAC0038 */  lw          $t4, 0x38($sp)
    /* 8D97C4 80A0AAF4 AD8002B8 */  sw          $zero, 0x2B8($t4)
  .L80A0AAF8:
    /* 8D97C8 80A0AAF8 8FBF0014 */  lw          $ra, 0x14($sp)
  .L80A0AAFC:
    /* 8D97CC 80A0AAFC 27BD0038 */  addiu       $sp, $sp, 0x38
    /* 8D97D0 80A0AB00 03E00008 */  jr          $ra
    /* 8D97D4 80A0AB04 00000000 */   nop
endlabel func_80A0A928_jp
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
