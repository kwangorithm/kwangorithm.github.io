# kwangorithm.github.io
## git
git clone 후 해당 폴더에서, 
1. rm -rf .git
2. rm -rf .gitignore
3. code .
4. vscode에서 publish 하면서 git init
5. 이후 git 페이지에서 Readme.md 만들고, branch를 main으로 변경 하는 코드 카피해서 실행 
6. 단, git init은 실행되지 않도록 할것.
7. vscode에서 sync 수행

## ubuntu
- 휴지통 비우기
  rm -rf ~/.local/share/Trash/files/*
- 파일 이름 변경
  gprename

## anaconda

https://docs.conda.io/projects/conda/en/latest/_downloads/843d9e0198f2a193a3484886fa28163c/conda-cheatsheet.pdf

- conda create -n vene_name python=3.8
- conda install -c conda-forge 패키지 이름
- conda forge를 디폴트로 설정
  1. conda config --add channels conda-forge 로 설정
  2. conda config --show channels 로 확인
  

- conda info —envs
- conda --version

- conda search conda-forge::tqdm
- conda env remove -n prayme
- conda env -n 새로만들 환경 clone 

## conda 가상환경 복사 (for Win, Linux, Mac OS)
- (내보내기) conda env export -n ENVNAME > environment.yml
- (복사) conda env create -f path/to/environment.yml  
- (clone) conda create --clone ENVNAME --name NEWENV
  
## conda 가상환경 복사 (for one OS)
  - exact pkg version 내보내기
  conda list --explicit > spec-file.txt
  - 새로운 가상환경 만들면서 exact pkg version 설치하기
  conda create --name MyEnvironment --file spec-file.txt
  - 기존 가상환경에 설치하기
  conda install --name MyEnvironment --file spec-file.txt


