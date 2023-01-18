#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

struct File {
    char name[50];
    int size;
};

struct Dir {
    char name[50];
    struct Dir *parent;
    struct Dir *dirs[100];
    struct File files[100];
    int nFiles;
    int nDirs;
};

int getDirSize(struct Dir *dir) {
    int sum = 0;

    if(dir->nDirs) {
        for(int i = 0; i < dir->nDirs; i++) {
            sum += getDirSize(dir->dirs[i]);
        }
    }

    for(int i = 0; i < dir->nFiles; i++) {
        sum += dir->files[i].size;
    }

    return sum;
}

int main()
{
	char *filename = "input.txt";
    FILE *fp = fopen(filename, "r");
    char line[256];
    
    struct Dir *dirs = malloc(1000 * sizeof(struct Dir));
    int nDirs = 1;
    strcpy(dirs[0].name, "/");
    dirs[0].parent = NULL;
    dirs[0].nFiles = 0;
    dirs[0].nDirs = 0;

    struct Dir *currentDir = &dirs[0];

    fgets(line, sizeof(line), fp);
    while(fgets(line, sizeof(line), fp)) {
        char lineCopy[256];
        strcpy(lineCopy, line);
        char *lineSplit = strtok(lineCopy, " ");
        lineSplit = strtok(NULL, " ");

        if(strcmp(lineSplit, "cd") == 0) {
            lineSplit = strtok(NULL, " ");
            lineSplit[strlen(lineSplit) - 1] = '\0';
            char dirName[256];
            strcpy(dirName, lineSplit);
            if(strcmp(dirName, "..")) {
                strcpy(dirs[nDirs].name, dirName);
                dirs[nDirs].parent = currentDir;
                dirs[nDirs].nFiles = 0;
                dirs[nDirs].nDirs = 0;
                currentDir->dirs[currentDir->nDirs++] = &dirs[nDirs];
                currentDir = &dirs[nDirs];
                nDirs++;
            }
            else {
                currentDir = currentDir->parent;
            }
        }
        else if(isdigit(line[0])) {
            struct File file;
            char *fileSplit = strtok(line, " ");
            file.size = strtol(fileSplit, NULL, 10);
            fileSplit = strtok(NULL, " ");
            strcpy(file.name, fileSplit);
            file.name[strlen(file.name) - 1] = '\0';
            currentDir->files[currentDir->nFiles++] = file;
        }
    }

    int result = 0;
    for(int i = 0; i < nDirs; i++) {
        int sum = getDirSize(&dirs[i]);
        printf("Sum: %d\n", sum);
        if(sum < 100000) {
            result += sum;
        }
    }

    printf("Sum of directories with size less than 100000 is %d", result);

    fclose(fp);

    return 0;
}