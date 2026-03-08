You are decompiling an assembly function called `func_80A24A8C_jp` in MIPS from a Nintendo 64 game.

# Examples

## `DoRelocation`

```c
void DoRelocation(void* allocatedRamAddr, OverlayRelocationSection* ovlRelocs, void* vramStart) {
    uintptr_t sections[RELOC_SECTION_MAX];
    u32* relocDataP;
    u32 reloc;
    u32 relocData;
    u32 isLoNeg;
    uintptr_t allocu32 = (uintptr_t)allocatedRamAddr;
    u32 i;
    u32* regValP;
    //! MIPS ELF relocation does not generally require tracking register values, so at first glance it appears this
    //! register tracking was an unnecessary complication. However there is a bug in the IDO compiler that can cause
    //! relocations to be emitted in the wrong order under rare circumstances when the compiler attempts to reuse a
    //! previous HI16 relocation for a different LO16 relocation as an optimization. This register tracking is likely
    //! a workaround to prevent improper matching of unrelated HI16 and LO16 relocations that would otherwise arise
    //! due to the incorrect ordering.
    u32* luiRefs[32];
    u32 luiVals[32];
    u32* luiInstRef;
    UNUSED u32 dbg;
    ptrdiff_t relocOffset = 0;
    u32 relocatedValue = 0;
    UNUSED uintptr_t unrelocatedAddress = 0;
    uintptr_t relocatedAddress = 0;
    UNUSED s32 pad;

    if (gOverlayLogSeverity >= 3) {}

    sections[RELOC_SECTION_NULL] = 0;
    sections[RELOC_SECTION_TEXT] = allocu32;
    sections[RELOC_SECTION_DATA] = ovlRelocs->textSize + allocu32;
    sections[RELOC_SECTION_RODATA] = ovlRelocs->dataSize + sections[RELOC_SECTION_DATA];

    for (i = 0; i < ovlRelocs->nRelocations; i++) {
        reloc = ovlRelocs->relocations[i];
        // This will always resolve to a 32-bit aligned address as each section
        // containing code or pointers must be aligned to at least 4 bytes and the
        // MIPS ABI defines the offset of both 16-bit and 32-bit relocations to be
        // the start of the 32-bit word containing the target.
        relocDataP = (u32*)(sections[RELOC_SECTION(reloc)] + RELOC_OFFSET(reloc));
        relocData = *relocDataP;

        switch (RELOC_TYPE_MASK(reloc)) {
            case R_MIPS_32 << RELOC_TYPE_SHIFT:
                // Handles 32-bit address relocation, used for things such as jump tables and pointers in data.
                // Just relocate the full address.

                // Check address is valid for relocation
                if ((*relocDataP & 0x0F000000) == 0) {
                    relocOffset = *relocDataP - (uintptr_t)vramStart;
                    relocatedValue = relocOffset + allocu32;
                    unrelocatedAddress = relocData;
                    relocatedAddress = relocatedValue;
                    *relocDataP = relocatedAddress;
                }
                break;

            case R_MIPS_26 << RELOC_TYPE_SHIFT:
                // Handles 26-bit address relocation, used for jumps and jals.
                // Extract the address from the target field of the J-type MIPS instruction.
                // Relocate the address and update the instruction.
                if (1) {
                    relocOffset = PHYS_TO_K0(MIPS_JUMP_TARGET(*relocDataP)) - (uintptr_t)vramStart;
                    unrelocatedAddress = PHYS_TO_K0(MIPS_JUMP_TARGET(*relocDataP));
                    relocatedValue = (*relocDataP & 0xFC000000) | (((allocu32 + relocOffset) & 0x0FFFFFFF) >> 2);
                    relocatedAddress = PHYS_TO_K0(MIPS_JUMP_TARGET(relocatedValue));
                    *relocDataP = relocatedValue;
                }
                break;

            case R_MIPS_HI16 << RELOC_TYPE_SHIFT:
                // Handles relocation for a hi/lo pair, part 1.
                // Store the reference to the LUI instruction (hi) using the `rt` register of the instruction.
                // This will be updated later in the `R_MIPS_LO16` section.

                luiRefs[MIPS_REG_RT(*relocDataP)] = relocDataP;
                luiVals[MIPS_REG_RT(*relocDataP)] = *relocDataP;
                break;

            case R_MIPS_LO16 << RELOC_TYPE_SHIFT:
                // Handles relocation for a hi/lo pair, part 2.
                // Grab the stored LUI (hi) from the `R_MIPS_HI16` section using the `rs` register of the instruction.
                // The full address is calculated, relocated, and then used to update both the LUI and lo instructions.
                // If the lo part is negative, add 1 to the LUI value.
                // Note: The lo instruction is assumed to have a signed immediate.

                luiInstRef = luiRefs[MIPS_REG_RS(*relocDataP)];
                regValP = &luiVals[MIPS_REG_RS(*relocDataP)];

                // Check address is valid for relocation
                if ((((*regValP << 0x10) + (s16)*relocDataP) & 0x0F000000) == 0) {
                    relocOffset = ((*regValP << 0x10) + (s16)*relocDataP) - (uintptr_t)vramStart;
                    isLoNeg = ((relocOffset + allocu32) & 0x8000) ? 1 : 0; // adjust for signed immediate
                    unrelocatedAddress = (*luiInstRef << 0x10) + (s16)relocData;
                    *luiInstRef =
                        (*luiInstRef & 0xFFFF0000) | ((((relocOffset + allocu32) >> 0x10) & 0xFFFF) + isLoNeg);
                    relocatedValue = (*relocDataP & 0xFFFF0000) | ((relocOffset + allocu32) & 0xFFFF);

                    relocatedAddress = (*luiInstRef << 0x10) + (s16)relocatedValue;
                    *relocDataP = relocatedValue;
                }
                break;
        }

        dbg = 16;
        switch (RELOC_TYPE_MASK(reloc)) {
            case R_MIPS_32 << RELOC_TYPE_SHIFT:
                dbg += 6;
                FALLTHROUGH;
            case R_MIPS_26 << RELOC_TYPE_SHIFT:
                dbg += 10;
                FALLTHROUGH;
            case R_MIPS_LO16 << RELOC_TYPE_SHIFT:
                if (gOverlayLogSeverity >= 3) {}
                // Adding a break prevents matching
        }
    }
}
```

```asm
         addiu sp, sp, -0x190
         sw ra, 0x2c(sp)
         sw s8, 0x28(sp)
         sw s7, 0x24(sp)
         sw s6, 0x20(sp)
         sw s5, 0x1c(sp)
         sw s4, 0x18(sp)
         sw s3, 0x14(sp)
         sw s2, 0x10(sp)
         sw s1, 0xc(sp)
         sw s0, 0x8(sp)
         sw zero, 0x180(sp)
         sw a0, 0x184(sp)
         lw t6, 0x0(a1)
         lui ra, 0xff
         or s0, a1, zero
         addu t7, t6, a0
         sw t7, 0x188(sp)
         lw t9, 0x4(a1)
         or s1, a0, zero
         or s2, a2, zero
         addu t6, t7, t9
         sw t6, 0x18c(sp)
         lw t1, 0x10(a1)
         ori ra, ra, 0xffff
         or t2, zero, zero
         beqz t1, .L204129
         or t3, a1, zero
         addiu s8, sp, 0x180
         lui s7, 0xffff
         lui s6, 0xf00
         addiu s5, sp, 0x64
         addiu s4, sp, 0xe4
         lui s3, 0x600
         lui t5, 0x400
         lui t4, 0x200
     127lw v0, 0x14(t3)
         lui at, 0x3f00
         addiu t2, t2, 0x1
         srl t7, v0, 30
         sll t8, t7, 2
         addu t9, s8, t8
         lw t6, 0x0(t9)
         and t7, v0, ra
         and t0, v0, at
         addu a1, t6, t7
         beq t4, t0, .Le457
         lw v1, 0x0(a1)
         beq t0, t5, .L10064
         lui at, 0x3ff
         lui at, 0x500
         beq t0, at, .L14481
         srl t6, v1, 16
         beq t0, s3, .L17493
         srl v0, v1, 21
         b .L1f4125
         nop 
     46and t8, v1, s6
         bnez t8, .L1f4125
         subu v0, v1, s2
         addu t9, v0, s1
         sw t9, 0x0(a1)
         b .L1f4125
         lw t1, 0x10(s0)
     48ori at, at, 0xffff
         and t6, v1, at
         sll t7, t6, 2
         lui at, 0x8000
         or t8, t7, at
         lui at, 0xfc00
         and t9, v1, at
         subu v0, t8, s2
         lui at, 0xfff
         ori at, at, 0xffff
         addu t6, s1, v0
         and t7, t6, at
         srl t8, t7, 2
         or a0, t9, t8
         sw a0, 0x0(a1)
         b .L1f4125
         lw t1, 0x10(s0)
     51andi t7, t6, 0x1f
         sll t9, t7, 2
         addu t8, s4, t9
         sw a1, 0x0(t8)
         lw v1, 0x0(a1)
         srl t6, v1, 16
         andi t7, t6, 0x1f
         sll t9, t7, 2
         addu t8, s5, t9
         sw v1, 0x0(t8)
         b .L1f4125
         lw t1, 0x10(s0)
     53andi v0, v0, 0x1f
         sll v0, v0, 2
         addu a0, s5, v0
         lw t8, 0x0(a0)
         addu t6, s4, v0
         lw a2, 0x0(t6)
         sll t7, v1, 16
         sra t9, t7, 16
         sll t6, t8, 16
         addu a3, t9, t6
         and t7, a3, s6
         bnez t7, .L1f4125
         subu v0, a3, s2
         addu v1, v0, s1
         andi t8, v1, 0x8000
         beqz t8, .L1c0112
         or v0, zero, zero
         b .L1c0112
         addiu v0, zero, 0x1
     108lw t9, 0x0(a2)
         srl t7, v1, 16
         andi t8, t7, 0xffff
         and t6, t9, s7
         addu t9, t8, v0
         or t7, t6, t9
         sw t7, 0x0(a2)
         lw t8, 0x0(a1)
         andi t9, v1, 0xffff
         and t6, t8, s7
         or a0, t6, t9
         sw a0, 0x0(a1)
         lw t1, 0x10(s0)
     55beq t4, t0, .L1fc127
         sltu at, t2, t1
     125bnez at, .L9036
         addiu t3, t3, 0x4
     26lw ra, 0x2c(sp)
         lw s0, 0x8(sp)
         lw s1, 0xc(sp)
         lw s2, 0x10(sp)
         lw s3, 0x14(sp)
         lw s4, 0x18(sp)
         lw s5, 0x1c(sp)
         lw s6, 0x20(sp)
         lw s7, 0x24(sp)
         lw s8, 0x28(sp)
         jr ra
         addiu sp, sp, 0x190
```

## `mRmTp_AssignFtrFgIdx`

```c
void mRmTp_AssignFtrFgIdx(u16* dst, u16* src, u16* arg2, u16* arg3) {
    UNUSED u16* temp;
    u16* dstValues[2];
    u16* srcValues[2];
    s32 val = 0;
    u16* cur;
    s32 h;
    s32 n;
    UNUSED s32 pad2;
    s32 i;
    s32 j;
    u16 item;
    s32 idx;
    mRmTp_FtrPlaceInfo placeData[mRmTp_FTR_UNIT_MAX];
    u16* item1;
    u16* item2;
    mRmTp_FtrPlaceInfo* dataPtr;
    s32 k;

    dstValues[0] = dst;
    dstValues[1] = arg2;
    srcValues[0] = src;
    srcValues[1] = arg3;

    for (i = 0; i < 2; i++) {
        if (srcValues[i] == 0) {}
        cur = dstValues[i];
        for (h = 0; h < UT_TOTAL_NUM; h++) {
            *(s16*)cur = -1;
        }
    }

    for (i = 0; i < 2; i++) {
        item1 = srcValues[i];
        item2 = dstValues[i];

        if (item1 != NULL && item2 != NULL) {
            for (n = 0; n < UT_Z_NUM; n++) {
                for (j = 0; j < UT_X_NUM; j++) {
                    item = item1[j + n * UT_X_NUM];
                    if (((item >= 0x1000) && (item < 0x1ECD)) &&
                        mRmTp_GetFurnitureData(item, j, n, placeData) != mRmTp_FTRSIZE_MAX) {
                        dataPtr = placeData;

                        for (k = 0; k < mRmTp_FTR_UNIT_MAX; k++) {
                            if (dataPtr->exists) {
                                idx = dataPtr->utX + dataPtr->utZ * UT_X_NUM;
                                item2[idx] = val;
                            }

                            dataPtr++;
                        }

                        val++;
                    }
                }
            }
        }
    }
}
```

```asm
         addiu sp, sp, -0xd0
         sw ra, 0x3c(sp)
         sw s8, 0x38(sp)
         sw s7, 0x34(sp)
         sw s6, 0x30(sp)
         sw s5, 0x2c(sp)
         sw s4, 0x28(sp)
         sw s3, 0x24(sp)
         sw s2, 0x20(sp)
         sw s1, 0x1c(sp)
         sw s0, 0x18(sp)
         sw a1, 0xbc(sp)
         or s1, zero, zero
         sw a0, 0xc4(sp)
         sw a2, 0xc8(sp)
         sw a3, 0xc0(sp)
         addiu a1, sp, 0xcc
         addiu t1, sp, 0xbc
         addiu t0, sp, 0xc4
         addiu v1, zero, 0x100
     29lw a0, 0x0(t0)
         addiu t6, zero, -0x1
         or v0, zero, zero
         sh t6, 0x0(a0)
         addiu v0, v0, 0x4
     25bnel v0, v1, .L6425
         addiu v0, v0, 0x4
         addiu t0, t0, 0x4
         sltu at, t0, a1
         bnez at, .L5020
         addiu t1, t1, 0x4
         addiu t7, sp, 0xbc
         addiu t8, sp, 0xc4
         sw t8, 0x50(sp)
         sw t7, 0x54(sp)
         addiu s8, zero, 0x3
         addiu s7, zero, 0x10
         addiu s5, sp, 0x68
         addiu s2, sp, 0x74
     117lw t9, 0x54(sp)
         lw t2, 0x50(sp)
         lw v0, 0x0(t9)
         lw s0, 0x0(t2)
         beqzl v0, .L1c0112
         lw t4, 0x54(sp)
         beqz s0, .L1bc111
         or s6, zero, zero
         sw v0, 0x4c(sp)
     109or s3, zero, zero
         lw s4, 0x4c(sp)
     104lhu a0, 0x0(s4)
         slti at, a0, 0x1000
         bnez at, .L19c103
         slti at, a0, 0x1ecd
         beqz at, .L19c103
         or a1, s3, zero
         or a2, s6, zero
         jal mRmTp_GetFurnitureData
         or a3, s5, zero
         beq v0, s8, .L19c103
         lw t3, 0x68(sp)
         beqz t3, .L11469
         lw t5, 0x70(sp)
         lw t4, 0x6c(sp)
         sll t6, t5, 4
         addu v1, t4, t6
         sll t7, v1, 1
         addu t8, s0, t7
         sh s1, 0x0(t8)
     61lw t9, 0x0(s2)
         or v0, s2, zero
         beqzl t9, .L14481
         lw t7, 0xc(v0)
         lw t3, 0x8(v0)
         lw t2, 0x4(v0)
         sll t5, t3, 4
         addu v1, t2, t5
         sll t4, v1, 1
         addu t6, s0, t4
         sh s1, 0x0(t6)
         lw t7, 0xc(v0)
     71addiu v0, v0, 0xc
         beqzl t7, .L17092
         lw t4, 0xc(v0)
         lw t9, 0x8(v0)
         lw t8, 0x4(v0)
         sll t3, t9, 4
         addu v1, t8, t3
         sll t2, v1, 1
         addu t5, s0, t2
         sh s1, 0x0(t5)
         lw t4, 0xc(v0)
     82addiu v0, v0, 0xc
         beqzl t4, .L19c103
         addiu s1, s1, 0x1
         lw t7, 0x8(v0)
         lw t6, 0x4(v0)
         sll t9, t7, 4
         addu v1, t6, t9
         sll t8, v1, 1
         addu t3, s0, t8
         sh s1, 0x0(t3)
         addiu s1, s1, 0x1
     52addiu s3, s3, 0x1
         bne s3, s7, .Lc850
         addiu s4, s4, 0x2
         lw t2, 0x4c(sp)
         addiu s6, s6, 0x1
         addiu t5, t2, 0x20
         bne s6, s7, .Lc048
         sw t5, 0x4c(sp)
     45lw t4, 0x54(sp)
     43lw t6, 0x50(sp)
         addiu t8, sp, 0xcc
         addiu t7, t4, 0x4
         addiu t9, t6, 0x4
         sw t9, 0x50(sp)
         bne t9, t8, .L9c39
         sw t7, 0x54(sp)
         lw ra, 0x3c(sp)
         lw s0, 0x18(sp)
         lw s1, 0x1c(sp)
         lw s2, 0x20(sp)
         lw s3, 0x24(sp)
         lw s4, 0x28(sp)
         lw s5, 0x2c(sp)
         lw s6, 0x30(sp)
         lw s7, 0x34(sp)
         lw s8, 0x38(sp)
         jr ra
         addiu sp, sp, 0xd0
```





# Declarations for the functions called from the target assembly

- `s32 mFI_Wpos2BlockNum(s32* blockX, s32* blockZ, xyz_t wpos);`

# Types definitions used in the declarations

```c
typedef struct xyz_t {
    /* 0x0 */ f32 x;
    /* 0x4 */ f32 y;
    /* 0x8 */ f32 z;
} xyz_t;
```

# Primary Objective

Decompile the following target assembly function from `asm/jp/nonmatchings/overlays/actors/ovl_Set_Npc_Manager/ac_set_npc_manager/func_80A24A8C_jp.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel func_80A24A8C_jp
nonmatching func_80A24A8C_jp, 0x27C
    /* 8EC54C 80A24A8C 27BDFF58 */  addiu       $sp, $sp, -0xA8
    /* 8EC550 80A24A90 AFB7003C */  sw          $s7, 0x3C($sp)
    /* 8EC554 80A24A94 00A0B825 */  or          $s7, $a1, $zero
    /* 8EC558 80A24A98 AFBF0044 */  sw          $ra, 0x44($sp)
    /* 8EC55C 80A24A9C AFBE0040 */  sw          $fp, 0x40($sp)
    /* 8EC560 80A24AA0 AFB60038 */  sw          $s6, 0x38($sp)
    /* 8EC564 80A24AA4 AFB50034 */  sw          $s5, 0x34($sp)
    /* 8EC568 80A24AA8 AFB40030 */  sw          $s4, 0x30($sp)
    /* 8EC56C 80A24AAC AFB3002C */  sw          $s3, 0x2C($sp)
    /* 8EC570 80A24AB0 AFB20028 */  sw          $s2, 0x28($sp)
    /* 8EC574 80A24AB4 AFB10024 */  sw          $s1, 0x24($sp)
    /* 8EC578 80A24AB8 AFB00020 */  sw          $s0, 0x20($sp)
    /* 8EC57C 80A24ABC AFA400A8 */  sw          $a0, 0xA8($sp)
    /* 8EC580 80A24AC0 8FAE00A8 */  lw          $t6, 0xA8($sp)
    /* 8EC584 80A24AC4 00009825 */  or          $s3, $zero, $zero
    /* 8EC588 80A24AC8 24160001 */  addiu       $s6, $zero, 0x1
    /* 8EC58C 80A24ACC 8DDE0008 */  lw          $fp, 0x8($t6)
    /* 8EC590 80A24AD0 8DD20004 */  lw          $s2, 0x4($t6)
    /* 8EC594 80A24AD4 8DD50000 */  lw          $s5, 0x0($t6)
    /* 8EC598 80A24AD8 25D10010 */  addiu       $s1, $t6, 0x10
    /* 8EC59C 80A24ADC AFB10060 */  sw          $s1, 0x60($sp)
    /* 8EC5A0 80A24AE0 95C200E0 */  lhu         $v0, 0xE0($t6)
    /* 8EC5A4 80A24AE4 95C300E2 */  lhu         $v1, 0xE2($t6)
    /* 8EC5A8 80A24AE8 95D800E4 */  lhu         $t8, 0xE4($t6)
    /* 8EC5AC 80A24AEC AFA20058 */  sw          $v0, 0x58($sp)
    /* 8EC5B0 80A24AF0 AFA3005C */  sw          $v1, 0x5C($sp)
    /* 8EC5B4 80A24AF4 A7B8008E */  sh          $t8, 0x8E($sp)
  .L80A24AF8:
    /* 8EC5B8 80A24AF8 8FAA005C */  lw          $t2, 0x5C($sp)
    /* 8EC5BC 80A24AFC 8FB90058 */  lw          $t9, 0x58($sp)
    /* 8EC5C0 80A24B00 026A5807 */  srav        $t3, $t2, $s3
    /* 8EC5C4 80A24B04 316C0001 */  andi        $t4, $t3, 0x1
    /* 8EC5C8 80A24B08 02794007 */  srav        $t0, $t9, $s3
    /* 8EC5CC 80A24B0C 31090001 */  andi        $t1, $t0, 0x1
    /* 8EC5D0 80A24B10 2D8D0001 */  sltiu       $t5, $t4, 0x1
    /* 8EC5D4 80A24B14 012D7824 */  and         $t7, $t1, $t5
    /* 8EC5D8 80A24B18 56CF0069 */  bnel        $s6, $t7, .L80A24CC0
    /* 8EC5DC 80A24B1C 26730001 */   addiu      $s3, $s3, 0x1
    /* 8EC5E0 80A24B20 924E001C */  lbu         $t6, 0x1C($s2)
    /* 8EC5E4 80A24B24 97B8008E */  lhu         $t8, 0x8E($sp)
    /* 8EC5E8 80A24B28 16CE0064 */  bne         $s6, $t6, .L80A24CBC
    /* 8EC5EC 80A24B2C 0278C807 */   srav       $t9, $t8, $s3
    /* 8EC5F0 80A24B30 33280001 */  andi        $t0, $t9, 0x1
    /* 8EC5F4 80A24B34 55000062 */  bnel        $t0, $zero, .L80A24CC0
    /* 8EC5F8 80A24B38 26730001 */   addiu      $s3, $s3, 0x1
    /* 8EC5FC 80A24B3C 52A00060 */  beql        $s5, $zero, .L80A24CC0
    /* 8EC600 80A24B40 26730001 */   addiu      $s3, $s3, 0x1
    /* 8EC604 80A24B44 5240005E */  beql        $s2, $zero, .L80A24CC0
    /* 8EC608 80A24B48 26730001 */   addiu      $s3, $s3, 0x1
    /* 8EC60C 80A24B4C 8E4B0010 */  lw          $t3, 0x10($s2)
    /* 8EC610 80A24B50 27A4007C */  addiu       $a0, $sp, 0x7C
    /* 8EC614 80A24B54 27A50078 */  addiu       $a1, $sp, 0x78
    /* 8EC618 80A24B58 AFAB0008 */  sw          $t3, 0x8($sp)
    /* 8EC61C 80A24B5C 8E470014 */  lw          $a3, 0x14($s2)
    /* 8EC620 80A24B60 8FA60008 */  lw          $a2, 0x8($sp)
    /* 8EC624 80A24B64 AFA7000C */  sw          $a3, 0xC($sp)
    /* 8EC628 80A24B68 8E4B0018 */  lw          $t3, 0x18($s2)
    /* 8EC62C 80A24B6C 0C0221C4 */  jal         mFI_Wpos2BlockNum
    /* 8EC630 80A24B70 AFAB0010 */   sw         $t3, 0x10($sp)
    /* 8EC634 80A24B74 14560051 */  bne         $v0, $s6, .L80A24CBC
    /* 8EC638 80A24B78 03C02025 */   or         $a0, $fp, $zero
    /* 8EC63C 80A24B7C 0C288CCC */  jal         func_80A23330_jp
    /* 8EC640 80A24B80 02A02825 */   or         $a1, $s5, $zero
    /* 8EC644 80A24B84 1440004D */  bnez        $v0, .L80A24CBC
    /* 8EC648 80A24B88 8FAC00A8 */   lw         $t4, 0xA8($sp)
    /* 8EC64C 80A24B8C 00134880 */  sll         $t1, $s3, 2
    /* 8EC650 80A24B90 0189A021 */  addu        $s4, $t4, $t1
    /* 8EC654 80A24B94 8E8D01AC */  lw          $t5, 0x1AC($s4)
    /* 8EC658 80A24B98 26B004E0 */  addiu       $s0, $s5, 0x4E0
    /* 8EC65C 80A24B9C 8FAF007C */  lw          $t7, 0x7C($sp)
    /* 8EC660 80A24BA0 55A00047 */  bnel        $t5, $zero, .L80A24CC0
    /* 8EC664 80A24BA4 26730001 */   addiu      $s3, $s3, 0x1
    /* 8EC668 80A24BA8 92060001 */  lbu         $a2, 0x1($s0)
    /* 8EC66C 80A24BAC 8FAE0078 */  lw          $t6, 0x78($sp)
    /* 8EC670 80A24BB0 55E60006 */  bnel        $t7, $a2, .L80A24BCC
    /* 8EC674 80A24BB4 8EF80014 */   lw         $t8, 0x14($s7)
    /* 8EC678 80A24BB8 92070002 */  lbu         $a3, 0x2($s0)
    /* 8EC67C 80A24BBC 8FA8007C */  lw          $t0, 0x7C($sp)
    /* 8EC680 80A24BC0 11C7002A */  beq         $t6, $a3, .L80A24C6C
    /* 8EC684 80A24BC4 00000000 */   nop
    /* 8EC688 80A24BC8 8EF80014 */  lw          $t8, 0x14($s7)
  .L80A24BCC:
    /* 8EC68C 80A24BCC 92070002 */  lbu         $a3, 0x2($s0)
    /* 8EC690 80A24BD0 27A40074 */  addiu       $a0, $sp, 0x74
    /* 8EC694 80A24BD4 14D80004 */  bne         $a2, $t8, .L80A24BE8
    /* 8EC698 80A24BD8 00000000 */   nop
    /* 8EC69C 80A24BDC 8EF90018 */  lw          $t9, 0x18($s7)
    /* 8EC6A0 80A24BE0 50F90037 */  beql        $a3, $t9, .L80A24CC0
    /* 8EC6A4 80A24BE4 26730001 */   addiu      $s3, $s3, 0x1
  .L80A24BE8:
    /* 8EC6A8 80A24BE8 0C288E2F */  jal         func_80A238BC_jp
    /* 8EC6AC 80A24BEC 27A50070 */   addiu      $a1, $sp, 0x70
    /* 8EC6B0 80A24BF0 14560032 */  bne         $v0, $s6, .L80A24CBC
    /* 8EC6B4 80A24BF4 27A40080 */   addiu      $a0, $sp, 0x80
    /* 8EC6B8 80A24BF8 8FA80070 */  lw          $t0, 0x70($sp)
    /* 8EC6BC 80A24BFC 92050001 */  lbu         $a1, 0x1($s0)
    /* 8EC6C0 80A24C00 92060002 */  lbu         $a2, 0x2($s0)
    /* 8EC6C4 80A24C04 8FA70074 */  lw          $a3, 0x74($sp)
    /* 8EC6C8 80A24C08 0C0222FF */  jal         mFI_BkandUtNum2Wpos
    /* 8EC6CC 80A24C0C AFA80010 */   sw         $t0, 0x10($sp)
    /* 8EC6D0 80A24C10 C7A40080 */  lwc1        $ft0, 0x80($sp)
    /* 8EC6D4 80A24C14 240A0003 */  addiu       $t2, $zero, 0x3
    /* 8EC6D8 80A24C18 E6440010 */  swc1        $ft0, 0x10($s2)
    /* 8EC6DC 80A24C1C C7A60088 */  lwc1        $ft1, 0x88($sp)
    /* 8EC6E0 80A24C20 E6460018 */  swc1        $ft1, 0x18($s2)
    /* 8EC6E4 80A24C24 8E220000 */  lw          $v0, 0x0($s1)
    /* 8EC6E8 80A24C28 50400025 */  beql        $v0, $zero, .L80A24CC0
    /* 8EC6EC 80A24C2C 26730001 */   addiu      $s3, $s3, 0x1
    /* 8EC6F0 80A24C30 A04A0010 */  sb          $t2, 0x10($v0)
    /* 8EC6F4 80A24C34 8E2C0000 */  lw          $t4, 0x0($s1)
    /* 8EC6F8 80A24C38 240B0003 */  addiu       $t3, $zero, 0x3
    /* 8EC6FC 80A24C3C 3C180001 */  lui         $t8, (0x1A5E1 >> 16)
    /* 8EC700 80A24C40 A18B0011 */  sb          $t3, 0x11($t4)
    /* 8EC704 80A24C44 8E2D0000 */  lw          $t5, 0x0($s1)
    /* 8EC708 80A24C48 92090001 */  lbu         $t1, 0x1($s0)
    /* 8EC70C 80A24C4C 3718A5E1 */  ori         $t8, $t8, (0x1A5E1 & 0xFFFF)
    /* 8EC710 80A24C50 A1A90012 */  sb          $t1, 0x12($t5)
    /* 8EC714 80A24C54 8E2E0000 */  lw          $t6, 0x0($s1)
    /* 8EC718 80A24C58 920F0002 */  lbu         $t7, 0x2($s0)
    /* 8EC71C 80A24C5C A1CF0013 */  sb          $t7, 0x13($t6)
    /* 8EC720 80A24C60 8E9900A4 */  lw          $t9, 0xA4($s4)
    /* 8EC724 80A24C64 10000015 */  b           .L80A24CBC
    /* 8EC728 80A24C68 AF380000 */   sw         $t8, 0x0($t9)
  .L80A24C6C:
    /* 8EC72C 80A24C6C 15060013 */  bne         $t0, $a2, .L80A24CBC
    /* 8EC730 80A24C70 8FAA0078 */   lw         $t2, 0x78($sp)
    /* 8EC734 80A24C74 55470012 */  bnel        $t2, $a3, .L80A24CC0
    /* 8EC738 80A24C78 26730001 */   addiu      $s3, $s3, 0x1
    /* 8EC73C 80A24C7C 8EEB0014 */  lw          $t3, 0x14($s7)
    /* 8EC740 80A24C80 54CB0005 */  bnel        $a2, $t3, .L80A24C98
    /* 8EC744 80A24C84 92A90524 */   lbu        $t1, 0x524($s5)
    /* 8EC748 80A24C88 8EEC0018 */  lw          $t4, 0x18($s7)
    /* 8EC74C 80A24C8C 50EC000C */  beql        $a3, $t4, .L80A24CC0
    /* 8EC750 80A24C90 26730001 */   addiu      $s3, $s3, 0x1
    /* 8EC754 80A24C94 92A90524 */  lbu         $t1, 0x524($s5)
  .L80A24C98:
    /* 8EC758 80A24C98 56C90009 */  bnel        $s6, $t1, .L80A24CC0
    /* 8EC75C 80A24C9C 26730001 */   addiu      $s3, $s3, 0x1
    /* 8EC760 80A24CA0 8E2D0000 */  lw          $t5, 0x0($s1)
    /* 8EC764 80A24CA4 8FAF00A8 */  lw          $t7, 0xA8($sp)
    /* 8EC768 80A24CA8 02202825 */  or          $a1, $s1, $zero
    /* 8EC76C 80A24CAC 11A00003 */  beqz        $t5, .L80A24CBC
    /* 8EC770 80A24CB0 8FA60060 */   lw         $a2, 0x60($sp)
    /* 8EC774 80A24CB4 0C289183 */  jal         func_80A2460C_jp
    /* 8EC778 80A24CB8 8DE4000C */   lw         $a0, 0xC($t7)
  .L80A24CBC:
    /* 8EC77C 80A24CBC 26730001 */  addiu       $s3, $s3, 0x1
  .L80A24CC0:
    /* 8EC780 80A24CC0 2401000F */  addiu       $at, $zero, 0xF
    /* 8EC784 80A24CC4 27DE0010 */  addiu       $fp, $fp, 0x10
    /* 8EC788 80A24CC8 26B50528 */  addiu       $s5, $s5, 0x528
    /* 8EC78C 80A24CCC 26520038 */  addiu       $s2, $s2, 0x38
    /* 8EC790 80A24CD0 1661FF89 */  bne         $s3, $at, .L80A24AF8
    /* 8EC794 80A24CD4 26310004 */   addiu      $s1, $s1, 0x4
    /* 8EC798 80A24CD8 8FBF0044 */  lw          $ra, 0x44($sp)
    /* 8EC79C 80A24CDC 8FB00020 */  lw          $s0, 0x20($sp)
    /* 8EC7A0 80A24CE0 8FB10024 */  lw          $s1, 0x24($sp)
    /* 8EC7A4 80A24CE4 8FB20028 */  lw          $s2, 0x28($sp)
    /* 8EC7A8 80A24CE8 8FB3002C */  lw          $s3, 0x2C($sp)
    /* 8EC7AC 80A24CEC 8FB40030 */  lw          $s4, 0x30($sp)
    /* 8EC7B0 80A24CF0 8FB50034 */  lw          $s5, 0x34($sp)
    /* 8EC7B4 80A24CF4 8FB60038 */  lw          $s6, 0x38($sp)
    /* 8EC7B8 80A24CF8 8FB7003C */  lw          $s7, 0x3C($sp)
    /* 8EC7BC 80A24CFC 8FBE0040 */  lw          $fp, 0x40($sp)
    /* 8EC7C0 80A24D00 03E00008 */  jr          $ra
    /* 8EC7C4 80A24D04 27BD00A8 */   addiu      $sp, $sp, 0xA8
endlabel func_80A24A8C_jp
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
