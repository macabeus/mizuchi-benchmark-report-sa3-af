You are decompiling an assembly function called `func_8095D1E0_jp` in MIPS from a Nintendo 64 game.

# Examples

## `mBGMForce_move_inform`

```c
void mBGMForce_move_inform(BgmForce* force) {
    if (force->inform == 1) {
        s32 checkField = mFI_CheckFieldData();

        if (checkField == FALSE || (checkField != FALSE && FI_GET_TYPE(mFI_GetFieldId()) != 0)) {
            force->flag = TRUE;
            mBGMPsComp_make_ps_wipe(0x428A);
        }

        force->inform = 2;
    } else if (force->inform == 3) {
        force->inform = 4;
    } else if (force->inform == 5) {
        if (force->flag) {
            mBGMPsComp_make_ps_wipe(0x28A);
        }

        force->inform = 6;
    } else if (force->inform == 7) {
        force->inform = 0;
        force->flag = FALSE;
    }
}
```

```asm
         addiu sp, sp, -0x18
         sw ra, 0x14(sp)
         or a1, a0, zero
         lw v0, 0x0(a1)
         addiu at, zero, 0x1
         bnel v0, at, .L7429
         addiu at, zero, 0x3
         jal mFI_CheckFieldData
         sw a1, 0x18(sp)
         beqz v0, .L4818
         lw a1, 0x18(sp)
         beqzl v0, .L6425
         addiu t8, zero, 0x2
         jal mFI_GetFieldId
         sw a1, 0x18(sp)
         andi t6, v0, 0xf000
         beqz t6, .L6024
         lw a1, 0x18(sp)
     9addiu t7, zero, 0x1
         sb t7, 0x4(a1)
         sw a1, 0x18(sp)
         jal mBGMPsComp_make_ps_wipe
         addiu a0, zero, 0x428a
         lw a1, 0x18(sp)
     16addiu t8, zero, 0x2
     11sw t8, 0x0(a1)
         b .Ld052
         lw ra, 0x14(sp)
         addiu at, zero, 0x3
     5bne v0, at, .L8433
         addiu t9, zero, 0x4
         b .Lcc51
         sw t9, 0x0(a1)
     29addiu at, zero, 0x5
         bnel v0, at, .Lbc47
         addiu at, zero, 0x7
         lbu t0, 0x4(a1)
         addiu a0, zero, 0x28a
         beqzl t0, .Lb044
         addiu t1, zero, 0x6
         jal mBGMPsComp_make_ps_wipe
         sw a1, 0x18(sp)
         lw a1, 0x18(sp)
         addiu t1, zero, 0x6
     38b  .Lcc51
         sw t1, 0x0(a1)
         addiu at, zero, 0x7
     34bnel v0, at, .Ld052
         lw ra, 0x14(sp)
         sw zero, 0x0(a1)
         sb zero, 0x4(a1)
     31lw ra, 0x14(sp)
     26addiu sp, sp, 0x18
         jr ra
         nop 
```





# Declarations for the functions called from the target assembly

- `s32 mEv_set_status(s32,s32);`
- `s32 mFI_CheckFieldData(void);`



# Primary Objective

Decompile the following target assembly function from `asm/jp/nonmatchings/overlays/actors/ovl_Event_Manager/ac_event_manager/func_8095D1E0_jp.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel func_8095D1E0_jp
nonmatching func_8095D1E0_jp, 0xA0
    /* 851FB0 8095D1E0 27BDFFE0 */  addiu       $sp, $sp, -0x20
    /* 851FB4 8095D1E4 AFBF001C */  sw          $ra, 0x1C($sp)
    /* 851FB8 8095D1E8 AFA40020 */  sw          $a0, 0x20($sp)
    /* 851FBC 8095D1EC AFA50024 */  sw          $a1, 0x24($sp)
    /* 851FC0 8095D1F0 0C021F10 */  jal         mFI_CheckFieldData
    /* 851FC4 8095D1F4 00000000 */   nop
    /* 851FC8 8095D1F8 24010001 */  addiu       $at, $zero, 0x1
    /* 851FCC 8095D1FC 10410003 */  beq         $v0, $at, .L8095D20C
    /* 851FD0 8095D200 8FAE0020 */   lw         $t6, 0x20($sp)
    /* 851FD4 8095D204 1000001A */  b           .L8095D270
    /* 851FD8 8095D208 00001025 */   or         $v0, $zero, $zero
  .L8095D20C:
    /* 851FDC 8095D20C 8DC40000 */  lw          $a0, 0x0($t6)
    /* 851FE0 8095D210 0C02035A */  jal         func_80080D68_jp
    /* 851FE4 8095D214 93A50027 */   lbu        $a1, 0x27($sp)
    /* 851FE8 8095D218 10400014 */  beqz        $v0, .L8095D26C
    /* 851FEC 8095D21C 24180001 */   addiu      $t8, $zero, 0x1
    /* 851FF0 8095D220 8C4F0008 */  lw          $t7, 0x8($v0)
    /* 851FF4 8095D224 94440010 */  lhu         $a0, 0x10($v0)
    /* 851FF8 8095D228 8C450004 */  lw          $a1, 0x4($v0)
    /* 851FFC 8095D22C 8C460000 */  lw          $a2, 0x0($v0)
    /* 852000 8095D230 8C47000C */  lw          $a3, 0xC($v0)
    /* 852004 8095D234 AFB80014 */  sw          $t8, 0x14($sp)
    /* 852008 8095D238 0C0234E9 */  jal         func_8008D3A4_jp
    /* 85200C 8095D23C AFAF0010 */   sw         $t7, 0x10($sp)
    /* 852010 8095D240 14400007 */  bnez        $v0, .L8095D260
    /* 852014 8095D244 8FA80020 */   lw         $t0, 0x20($sp)
    /* 852018 8095D248 8FB90020 */  lw          $t9, 0x20($sp)
    /* 85201C 8095D24C 24050020 */  addiu       $a1, $zero, 0x20
    /* 852020 8095D250 0C01FF6A */  jal         mEv_set_status
    /* 852024 8095D254 8F240000 */   lw         $a0, 0x0($t9)
    /* 852028 8095D258 10000005 */  b           .L8095D270
    /* 85202C 8095D25C 00001025 */   or         $v0, $zero, $zero
  .L8095D260:
    /* 852030 8095D260 8D040000 */  lw          $a0, 0x0($t0)
    /* 852034 8095D264 0C0203C3 */  jal         func_80080F0C_jp
    /* 852038 8095D268 93A50027 */   lbu        $a1, 0x27($sp)
  .L8095D26C:
    /* 85203C 8095D26C 24020001 */  addiu       $v0, $zero, 0x1
  .L8095D270:
    /* 852040 8095D270 8FBF001C */  lw          $ra, 0x1C($sp)
    /* 852044 8095D274 27BD0020 */  addiu       $sp, $sp, 0x20
    /* 852048 8095D278 03E00008 */  jr          $ra
    /* 85204C 8095D27C 00000000 */   nop
endlabel func_8095D1E0_jp
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
